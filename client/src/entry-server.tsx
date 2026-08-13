import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import AppServer from "./AppServer";

export function render(url: string) {
  return renderToString(
    <Router ssrPath={url}>
      <AppServer />
    </Router>,
  );
}
