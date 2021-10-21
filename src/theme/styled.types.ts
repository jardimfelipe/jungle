import "styled-components";

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      blue: string;
      black: string;
      gray: string;
      darkGray: string;
      p1: string;
      p2: string;
      p3: string;
      background: string;
    },
    sizes: {
      sidebar: string;
      userbar: string;
    }
  }
}