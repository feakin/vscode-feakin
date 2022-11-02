// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import { FklCompletionItemProvider } from "./completion";

let output: vscode.OutputChannel;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  console.log("Congratulations, your extension 'fkl' is now active!");

  output = vscode.window.createOutputChannel("Fkl", "fkl");
  context.subscriptions.push(output);
  output.show();

  console.log("Fkl: activate" + context.extensionPath + " " + output);

  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      { pattern: "**/*.fkl", scheme: "file" },
      new FklCompletionItemProvider(output),
      ".",
      " "
    )
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
