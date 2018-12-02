import React from "react";
import ReactDOM from "react-dom";

const componentMap = {
  App: import("./App"),
};

export async function mount(container: HTMLElement) {
  const componentName = container.dataset.componentName!;
  if (componentMap.hasOwnProperty(componentName)) {
    console.time(componentName);
    const componentModule = await componentMap[componentName];
    const ComponentType = componentModule[componentName];
    const component = <ComponentType />;
    ReactDOM.render(component, container, () => {
      console.timeEnd(componentName);
    });
  } else {
    console.error("No component registered: ", componentName);
  }
}

export async function mountAll() {
  for (const container of document.querySelectorAll<HTMLElement>("*[data-component-name]")) {
    mount(container);
  }
}
