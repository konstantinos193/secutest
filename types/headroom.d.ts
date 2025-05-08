declare module 'headroom.js' {
    interface HeadroomOptions {
      offset?: number;
      tolerance?: number | { up?: number; down?: number };
      classes?: {
        initial?: string;
        pinned?: string;
        unpinned?: string;
        top?: string;
        notTop?: string;
        bottom?: string;
        notBottom?: string;
      };
      onPin?: () => void;
      onUnpin?: () => void;
      onTop?: () => void;
      onNotTop?: () => void;
      onBottom?: () => void;
      onNotBottom?: () => void;
    }
  
    class Headroom {
      constructor(element: HTMLElement, options?: HeadroomOptions);
      init(): void;
      destroy(): void;
      pin(): void;
      unpin(): void;
      freeze(): void;
      unfreeze(): void;
    }
  
    export default Headroom;
  }