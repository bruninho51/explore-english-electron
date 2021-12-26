import React, { ReactElement } from 'react';
import videojs from 'video.js';
import { SubtitleControl } from '../SubtitleControl';
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/sea/index.css';
import { Center } from './Center';

export default class VideoPlayer extends React.Component<Props> {
  private player: videojs.Player;

  state: State;

  videoNode: HTMLVideoElement;

  defaultProps (): State {
    return {
      edit: false,
      subtitle: this.props.subtitle[0],
      subtitleIndex: 0,
      showSubtitle: false
    };
  }

  constructor (props: Props) {
    super(props);
    this.state = {
      ...this.defaultProps()
    };
  }

  nextSubtitle (): void {
    const $this = this;
    const index = $this.state.subtitleIndex + 1;
    $this.setState({
      ...$this.state,
      subtitle: $this.props.subtitle[index],
      subtitleIndex: index
    });
  }

  showSubtitle (): void {
    const $this = this;
    $this.setState({
      ...$this.state,
      showSubtitle: true
    });
  }

  searchSubtitle (currentTime: Date): void {
    const $this = this;
    const timestamp = currentTime.getTime();
    const subtitle = $this.props.subtitle.find(subtitle => {
      const start = (new Date(subtitle.start)).getTime() - this.props.balance;
      const end = (new Date(subtitle.end)).getTime() - this.props.balance;
      return timestamp >= start && timestamp < end;
    });
    if (subtitle) {
      $this.setState({
        ...$this.state,
        showSubtitle: true,
        subtitle: subtitle,
        subtitleIndex: subtitle.identifier - 1
      });
    }
  }

  mountVideo (): void {
    const $this = this;

    $this.player = videojs($this.videoNode, {
      autoplay: true,
      controls: true,
      sources: $this.props.sources
    });

    $this.player.on('timeupdate', function () {
      const currentTime = new Date();
      currentTime.setHours(0, 0, 0, 0);
      currentTime.setSeconds(this.currentTime());
      $this.searchSubtitle(currentTime);
    });

    $this.player.on('seeking', function () {
      $this.setState({
        ...$this.state,
        showSubtitle: false,
        subtitle: null,
        subtitleIndex: null
      });
    });
  }

  componentDidUpdate (prevProps: Props): void {
    if (prevProps.sources[0].src !== this.props.sources[0].src) {
      this.player.src({ type: 'video/mp4', src: `file://${this.props.sources[0].src}` });
    }

    if (prevProps.subtitle !== this.props.subtitle) {
      this.setState({ ...this.defaultProps() });
    }
  }

  componentDidMount (): void {
    this.mountVideo();
  }

  componentWillUnmount (): void {
    if (this.player) {
      this.player.dispose();
    }
  }

  render (): ReactElement {
    return (
      <Center>
        <div data-vjs-player>
          <video
            style={{ width: '100%', marginBottom: '5px' }}
            ref={ node => { this.videoNode = node; } }
            className="video-js vjs-theme-sea"
          />
        </div>
        <SubtitleControl
            subtitle={this.state.showSubtitle ? this.state.subtitle.subtitle : ''}
            edit={this.state.edit}
            onClick={() => {
              this.player.pause();
              this.setState({ edit: true });
            }}
            onCancel={() => {
              this.player.play();
              this.setState({ edit: false });
            }}
            onSave={(word: number, subtitle: string) => {
              this.props.onSave(word, subtitle);
              this.setState({ edit: false });
              this.player.play();
            }}
        />
      </Center>
    );
  }
}

export type Props = {
  balance?: number
  subtitle: Array<{
    identifier: number
    subtitle: string
    start: Date
    end: Date
  }>
  sources: Array<{
    src: string
    type: string
  }>
  autoplay: boolean
  controls: boolean
  onSave: (word: number, subtitle: string) => void
}

export type State = {
  edit: boolean
  subtitleIndex: number
  showSubtitle: boolean
  balance?: number
  subtitle: {
    identifier: number
    subtitle: string
    start: Date
    end: Date
  }
}

export { VideoPlayer };
