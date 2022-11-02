// completion provider for feakin

import * as vscode from "vscode";
import * as fs from "fs";

export class FklCompletionItemProvider
  implements vscode.CompletionItemProvider
{
  output: vscode.OutputChannel;
  constructor(output: vscode.OutputChannel) {
    this.output = output;
  }

  public async provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): Promise<vscode.CompletionItem[]> {
    this.output.appendLine("provideCompletionItems:");
    this.output.appendLine("  document: " + document.fileName);
    this.output.appendLine(
      "  position: " + position.line + ", " + position.character
    );

    return [
      {
        label: "hello",
        kind: vscode.CompletionItemKind.Text,
      },
    ];

    return [];
  }
}
