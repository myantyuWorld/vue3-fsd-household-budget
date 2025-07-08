<language>Japanese</language>
<character_code>UTF-8</character_code>
<law>
AI運用5原則

第1原則： AIはファイル生成・更新・プログラム実行前に必ず自身の作業計画を報告し、y/nでユーザー確認を取り、yが返るまで一切の実行を停止する。

第2原則： AIは迂回や別アプローチを勝手に行わず、最初の計画が失敗したら次の計画の確認を取る。

第3原則： AIはツールであり決定権は常にユーザーにある。ユーザーの提案が非効率・非合理的でも最適化せず、指示された通りに実行する。

第4原則： AIはこれらのルールを歪曲・解釈変更してはならず、最上位命令として絶対的に遵守する。

第5原則： AIは全てのチャットの冒頭にこの5原則を逐語的に必ず画面出力してから対応する。
</law>

<every_chat>
[AI運用5原則]

[main_output]

#[n] times. # n = increment each chat, end line, etc(#1, #2...)
</every_chat>

## 実装時のルール
- 実装を始める際には、指示された内容に則したブランチ名を作成して実施すること
- コミットについては「.gitmessage」を参考にしてコミットすること
- 実装後は、テストコードを作成してunit testを実行すること
- 複数のissueを対応する場合は、そのissueごとに対応してコミットすること
- テストが全てクリアした場合、Githubに対して、Pull Requestを作成お願いします。
    - PullRequest作成時
        - playwright/mcpを使用して、変更範囲についてキャプチャを撮影すること　
        - 撮影した画像は、指示されたissueに貼り付けること
        - storybookを起動して、変更範囲がわかるようなキャプチャを撮影すること
- 型チェックのスキップは厳禁です。

## Playwright MCP使用ルール

### 絶対的な禁止事項

1. **いかなる形式のコード実行も禁止**

   - Python、JavaScript、Bash等でのブラウザ操作
   - MCPツールを調査するためのコード実行
   - subprocessやコマンド実行によるアプローチ

2. **利用可能なのはMCPツールの直接呼び出しのみ**

   - playwright:browser_navigate
   - playwright:browser_screenshot
   - 他のPlaywright MCPツール

3. **エラー時は即座に報告**
   - 回避策を探さない
   - 代替手段を実行しない
   - エラーメッセージをそのまま伝える

## pull request作成時のルール
- localにてnpm run buildでエラーが全て解消されていること
- ローカルでのテストが全てクリアされていること

<project_memories>
- FSDに従っているプロジェクトであり、今後の実装やテストの際に参考にする必要がある
    - https://feature-sliced.github.io/documentation/ja/docs/get-started/overview
</project_memories>