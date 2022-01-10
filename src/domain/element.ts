export class Element {
  private readonly _children: Element[] = []

  get children (): Element[] {
    return this._children;
  }

  public pushChild (child: Element): void {
    this._children.push(child);
  }
}
