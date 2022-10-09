// completion provider for feakin

import * as vscode from "vscode";
import * as fs from "fs";

export class FklCompletionItemProvider
  implements vscode.CompletionItemProvider
{
  public async provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): Promise<vscode.CompletionItem[]> {
    return [
      {
        label: "hello",
        kind: vscode.CompletionItemKind.Text,
      },
    ];

    return [];
  }
}
