import * as path from "node:path";

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";

let output: vscode.OutputChannel;

export async function activate(context: vscode.ExtensionContext) {
  console.log("Congratulations, your extension 'fkl' is now active!");

  output = vscode.window.createOutputChannel("Fkl", "fkl");
  context.subscriptions.push(output);
  output.show();

  let client;

  // TODO: download fkl-lsp from github
  let exe = path.resolve(__dirname, "../../fklang/target/debug/fkl-lsp.exe");

  // check if exe exists
  try {
    await vscode.workspace.fs.stat(vscode.Uri.file(exe));
  } catch (error) {
    output.appendLine("fkl-lsp not found");
    return;
  }

  const serverOptions: ServerOptions = {
    run: { command: exe, transport: TransportKind.stdio },
    debug: {
      command: exe,
      transport: TransportKind.stdio,
    },
  };

  // Options to control the language client
  let clientOptions: LanguageClientOptions = {
    // Register the server for plain text documents
    documentSelector: [{ scheme: "file", language: "fkl" }],
    outputChannel: output,
    progressOnInitialization: true,
    traceOutputChannel: output,
    synchronize: {
      // Notify the server about file changes to '.clientrc files contained in the workspace
      fileEvents: vscode.workspace.createFileSystemWatcher("**/*.fkl"),
    },
  };

  client = new LanguageClient("fkl-lsp-client", serverOptions, clientOptions);
  client.start();

  context.subscriptions.push(client);
}

// This method is called when your extension is deactivated
export function deactivate() {}
