# pushstate/popstateのサンプル

HTML5ではhistoryオブジェクトにpushState()及びreplaceState()メソッドが導入され、履歴エントリの操作ができるようになりました。
これとwindow.popstateイベントとで連携することで、ユーザビリティの改善などが可能になります。

## historyオブジェクトのメソッド

```
window.history.pushState(data, title [, url ] )
Pushes the given data onto the session history, with the given title, and, if provided and not null, the given URL.

window.history.replaceState(data, title [, url ] )
Updates the current entry in the session history to have the given data, title, and, if provided and not null, URL.
```

`pushState()`は、履歴のスタックにエントリーを追加します。

`replceState()`は、現在の履歴スタックのエントリーを書き換えます。

それぞれdata引数で任意のオブジェクトを渡すことができ、そのオブジェクトは履歴がpopされた時にpopstateイベントハンドラから参照することができます。

title引数は現在のところ無視されるようです。

url引数を指定すると、URL欄に表示されますが、通常の画面遷移と違い、これらのメソッドを呼んでも**画面遷移は発生しません**。

## window.popstateイベント

ユーザーがブラウザの戻るボタンなどを使用して履歴のスタックがpopされると、`popstate`イベントが発生します。

その際イベントハンドラに渡されるイベントオブジェクトの`state`プロパティには、`pushState()`の第一引数で渡したオブジェクトが入っています。

このオブジェクトを利用して、以前の状態を復元したりすることができます。

## 利用例

最近のウェブアプリケーションでは、ひとつのHTML内で様々な状態遷移や画面転換などを行うことが増えています。

それに連れて、戻るボタンでひとつ前のHTMLに戻ってしまうと状態が全て失われて悲しいことになる場合があります。

履歴操作はこのような事態を改善することができます。履歴の区切りをこれまでの(HTTP的)ページ遷移に加えてページ内動作の各段階に付けることで、自由に段階を行き来することができます。
例えばプログラムのバージョン管理の履歴を行き来するような感覚で。

また、例えばフォーム入力画面に戻った場合に先ほど入力した内容が消えてしまって入れなおさなければならないような悲しい場合にも、次の画面に遷移する前に`replaceState`でフォームの記入状態を記録しておけば、戻ってきた時にデータを復元することが可能になります。

## サンプル

サンプルを動かしてみましょう。

ブラウザで`index.html`を開いて、「小細工なし」の方をクリックして下さい。

そしてページ内遷移を幾つかやってみて、戻るボタンを押してみて下さい。index.htmlに戻ってしまいますね。

今度は「小細工あり」の方をクリックして、同じように幾つかページ内遷移してみて下さい。そして戻るボタンを使うと、`index.html`ではなく前回いた場所に戻るような動作になります。

仕組みは下記のようになります。

```javascript
    $("a").on("click", function(e){
        e.preventDefault();

        var hash = $(this).attr("href");

        move_to_id(hash);

        if(flg){
            history.pushState({hash: hash}, null, null);
        }

    });
```

`a`タグがクリックされると、`href`に入っているハッシュ(`#sec1`など)を、`pushState`に渡しています。

そして戻るボタンがクリックされると、

```javascript
    $(window).on("popstate", function(e){
        if(e.originalEvent.state){
            move_to_id(e.originalEvent.state.hash);
        } else {
            $("html,body").scrollTop(0);
        }
    });
```

`pushState`で入れた履歴の場合、イベントオブジェクトにどのハッシュのところにいたかが付いてくるので、指定された場所に移動します。












