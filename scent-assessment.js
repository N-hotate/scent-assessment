'use strict';
// 17.1 HTML のタグに設定したid を取得して変数に代入する
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

// 17.2 診断ボタンが押されたときに、入力された名前を受け取って診断結果を表示する
// assessmentButton.onclick = function() { }をアロー関数に
assessmentButton.onclick = () => {
  const userName = userNameInput.value; // 変数名.value で値を取得できる
  if (userName.length === 0) {
    return; // 名前入力欄が空欄のときは処理を終了する（ガード句）
  }

  // 診断結果表示エリアの作成
  resultDivided.innerText = '';
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header); // div タグ内の子要素として埋め込む

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  // ツイートエリアの作成
  // 18.1 取得したツイートボタンをJS から扱えるようにする
  tweetDivided.innerText = '';
  const anchor = document.createElement('a');
  const hrefValue = // URI のクエリ内の日本語（半角英数以外）をエンコードする
    `https://twitter.com/intent/tweet?button_hashtag=${encodeURIComponent('おすすめの香り診断')}&ref_src=twsrc%5Etfw`;
  
  // .setAttribute( )メソッド: 第一引数の属性に、第二引数の値を設定する（or 変更する）
  anchor.setAttribute('href', hrefValue);
  anchor.setAttribute('class', 'twitter-hashtag-button');
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #おすすめの香り診断';
  
  tweetDivided.appendChild(anchor); // 各属性に値を設定したa タグをdiv タグの子要素として埋め込む

  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
};

// 練習問題: Enter キーが押された場合にも診断結果を表示できるようにする
// 要素.onkeydown = function(){} で、キーが押されたときに渡された関数を実行する
userNameInput.onkeydown = event => { // 引数（押されたキー）をevent とするアロー関数
  if (event.key === 'Enter') { // 引数（=event）がEnter キーだったら
    assessmentButton.onclick();
  }
}

const answers = [
'{userName} におすすめの香りは【ラベンダー】です。\nリラックスできる香りが {userName} に安眠効果をもたらします。',
'{userName} におすすめの香りは【ローズ】です。\n優雅で華やかな香りが {userName} の気持ちをポジティブにします。',
'{userName} におすすめの香りは【ゼラニウム】です。\n爽やかな香りが {userName} のモヤモヤを和らげます。',
'{userName} におすすめの香りは【ホワイトティー】です。\n深みのあるやわらかな香りで {userName} の心をゆったりと落ち着かせます。',
'{userName} におすすめの香りは【白檀】です。\n静かで温かみのある香りが {userName} の気持ちを穏やかにします。',
'{userName} におすすめの香りは【金木製】です。\nすっきりとした甘く優しい香りで {userName} の疲れを癒します。',
'{userName} におすすめの香りは【バニラ】です。\n甘く濃厚な香りが {userName} の緊張を和らげます。',
'{userName} におすすめの香りは【レモングラス】です。\n柑橘系の爽やかな香りで {userName} の集中力を高めます。',
'{userName} におすすめの香りは【ミント】です。\n清涼感あふれる香りで {userName} の気持ちもリフレッシュできます。',
'{userName} におすすめの香りは【ジャスミン】です。\nエキゾチックな香りで {userName} のストレスを和らげます。',
'{userName} におすすめの香りは【ローズマリー】です。\nハーバルですっきりとした香りが {userName} の記憶力や集中力を高めます。',
'{userName} におすすめの香りは【グレープフルーツ】です。\n少しほろ苦さのあるフレッシュな香りが {userName} を清々しい気分にします。',
'{userName} におすすめの香りは【バジル】です。\nスパイシーでシャープな香りで {userName} の頭をシャキッとさせてくれます。',
'{userName} におすすめの香りは【柚子】です。\n上品で甘酸っぱい香りで {userName} に活力を与えます。',
'{userName} におすすめの香りは【ムスク】です。\n高貴で深みのある香りが {userName} の緊張や疲れを和らげます。',
'{userName} におすすめの香りは【フランキンセンス】です。\nウッディでややスパイシーな香りで {userName} の呼吸を整えます。',
'{userName} におすすめの香りは【ホワイトリリー】です。\n上品で清潔感のある香りが {userName} にリラックス効果をもたらします。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */

function assessment(userName) {
  // 16.1 入力された全ての文字のコード番号を取得して、足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 16.2 文字のコード番号の合計を回答の数で割って、添え字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  // 16.3 {userName} をユーザーの名前に置き換える
  result = result.replaceAll('{userName}', userName);
  return result;
}

// 16.4 テストコード
console.assert(
  assessment('太郎') === 
    '太郎 におすすめの香りは【金木製】です。\nすっきりとした甘く優しい香りで 太郎 の疲れを癒します。',
  '{userName}をユーザーの名前に変換する処理が正しくありません。'
);
console.assert(
  assessment('太郎') === assessment('太郎'),
  '入力したユーザー名が同じなら、同じ診断結果を出力する処理が正しくありません。');

console.log(assessment('太郎'));
console.log(assessment('次郎'));
console.log(assessment('太郎'));