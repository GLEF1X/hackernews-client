import * as React from "react";

declare module "html-to-react" {
  export class Parser {
    parse(text: string): React.ReactNode;
  }
}
