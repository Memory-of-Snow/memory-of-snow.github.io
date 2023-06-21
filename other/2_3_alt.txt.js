/**
 * テキスト投稿イベント(リプライ)を組み立てる
 * @param {string} content 投稿内容
 * @param {import("nostr-tools").Event} targetEvent リプライ対象のイベント
 */
const composeReplyPost = (content, targetEvent) => {

  /* Q-1: これまで学んだことを思い出しながら、
          リプライを表現するイベントを組み立てよう */

  //A-1.ここから
  const targetEventRootTag = targetEvent.tags.filter(subArray => subArray.length === 4 && subArray[0]==="e" && subArray[3] === "root" );
  let tagsElement;

  if(targetEventRootTag.length == 0){
    //rootのないReplyの場合、rootタグはreplyされたpostのid、replyタグはなし
    tagsElement=[
                  ["e", targetEvent.id, "","root"],
                  ["p", targetEvent.pubkey, ""]
                ];
  } else{
    //rootのあるReplyの場合、rootタグはコピー、replayタグに対象のid
    tagsElement = [
                targetEventRootTag[0],
                ["e", targetEvent.id, "","reply"],
                ["p", targetEvent.pubkey, ""]
                ];
  }

  const ev = {
    kind: 1,
    content: content,
    tags: tagsElement,
    created_at: currUnixtime(),
  };

  // イベントID(ハッシュ値)計算・署名
  return finishEvent(ev, BOT_PRIVATE_KEY_HEX);

  //A-1.ここまで
};
