export type LeftColumnComponentsName = 'Sidebar' | 'Settings';

export interface LeftColumnComponent {
  name: LeftColumnComponentsName,
  path: string,
}

export type LeftColumnComponentsList = Array<LeftColumnComponent>;
