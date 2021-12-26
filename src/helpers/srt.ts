import readline from 'readline';
import fs from 'fs';

export enum SegmentType {
  IDENTIFIER = 'identifier',
  HOUR = 'hour',
  SUBTITLE = 'subtitle',
  BREAK = 'break'
}

export enum OrderType {
  ASC = 'asc',
  DESC = 'desc'
}

export function removeTags (text: string): string {
  const regex = /(<([^>]+)>)/ig;
  return text.replace(regex, '');
}

export function removeSpecialCharacters (text: string): string {
  const regex = /[`~!@#$%^&*()_|+\-=?;:",.<>\{\}\[\]\\\/]/gi;
  return text.replace(regex, '');
}

export function getHour (hour: string): Date[] {
  const arr = hour.replace(/,/g, ':').split('-->');
  const arrMin = arr[0].trim().split(':');
  const arrMax = arr[1].trim().split(':');
  const min = new Date();
  min.setHours(Number(arrMin[0]), Number(arrMin[1]), Number(arrMin[2]), Number(arrMin[3]));
  const max = new Date();
  max.setHours(Number(arrMax[0]), Number(arrMax[1]), Number(arrMax[2]), Number(arrMax[3]));
  return [min, max];
}

export function orderAccumulator (accumulator: any, type: OrderType): void {
  const ordinators = {
    [OrderType.ASC]: (a: any, b: any) => {
      return a.count - b.count;
    },
    [OrderType.DESC]: (a: any, b: any) => {
      return b.count - a.count;
    }
  };

  accumulator.words.sort(ordinators[type]);
}

export function srtReadingControl (): (line: string) => SegmentType {
  let segment = SegmentType.BREAK;

  function getCurrentSegment (line: string): SegmentType {
    const conditions = [{
      segment: SegmentType.IDENTIFIER,
      satisfied: line && segment === SegmentType.BREAK
    }, {
      segment: SegmentType.HOUR,
      satisfied: segment === SegmentType.IDENTIFIER
    }, {
      segment: SegmentType.SUBTITLE,
      satisfied: segment === SegmentType.HOUR || (line && segment === SegmentType.SUBTITLE)
    }, {
      segment: SegmentType.BREAK,
      satisfied: !line
    }];

    segment = conditions.find(condition => condition.satisfied)?.segment;

    return segment;
  }

  return getCurrentSegment;
}

const getCurrentSegment = srtReadingControl();

const getLineReader = (): (accumulator: any[], line: string) => void => {
  let current: any = {};
  return (accumulator: any[], line: string) => {
    const segment = getCurrentSegment(line);
    switch (segment) {
      case SegmentType.SUBTITLE: {
        current.subtitle = removeSpecialCharacters(removeTags(line)).trim();
        break;
      }
      case SegmentType.IDENTIFIER: {
        current.identifier = Number(line);
        break;
      }
      case SegmentType.HOUR: {
        const [start, end] = getHour(line);
        current = { ...current, start, end };
        break;
      }
      default: {
        accumulator.push(current);
        current = {};
      }
    }
  };
};

export async function srtToArray (path: string): Promise<any> {
  return await new Promise((resolve, reject) => {
    if (fs.existsSync(path)) {
      const accumulator: any[] = [];
      const readLine = getLineReader();
      const input = fs.createReadStream(path);
      const rl = readline.createInterface({ input });
      rl.on('line', line => readLine(accumulator, line));
      rl.on('close', () => resolve(accumulator));
      return;
    }

    reject();
  });
}
