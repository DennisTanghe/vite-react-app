
export interface IWindowDimension {
    width: number;
    height: number;
}

export class WindowDimension implements IWindowDimension {
    width: number = 0;
    height: number = 0;

    static getCurrentDimension = (): IWindowDimension => {
        return <IWindowDimension>{
            width: window.innerWidth,
            height: window.innerHeight
        };
    };
}
