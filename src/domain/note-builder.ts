export class NoteBuilder {
  private _addNote: any
  private _fields: any
  private _tags: any
  private _audio: any
  private _options: any

  addNote (addNote: any): NoteBuilder {
    this._addNote = addNote;
    return this;
  }

  options (options: any): NoteBuilder {
    this._options = options;
    return this;
  }

  fields (fields: any): NoteBuilder {
    this._fields = fields;
    return this;
  }

  tags (tags: any): NoteBuilder {
    this._tags = tags;
    return this;
  }

  audio (audio: any): NoteBuilder {
    this._audio = audio;
    return this;
  }

  build (): any {
    return {
      action: 'addNote',
      version: 6,
      params: {
        note: {
          ...this._addNote,
          fields: this._fields,

          tags: this._tags,
          audio: this._audio,
          options: this._options
        }
      }
    };
  }
}
