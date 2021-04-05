javascript:(
function(){
	/*
	## pred_id
	- 0:全国 1:北海道 2:青森 3:岩手 4:宮城 5:秋田 6:山形 7:福島 8:茨城 9:栃木 10:群馬
	- 11:埼玉 12:千葉 13:東京 14:神奈川 15:新潟 16:富山 17:石川 18:福井 19:山梨 20:長野
	- 21:岐阜 22:静岡 23:愛知 24:三重 25:滋賀 26:京都 27:大阪 28:兵庫 29:奈良 30:和歌山
	- 31:鳥取 32:島根 33:岡山 34:広島 35:山口 36:徳島 37:香川 38:愛媛 39:高知 40:福岡
	- 41:佐賀 42:長崎 43:熊本 44:大分 45:宮崎 46:鹿児島 47:沖縄 48:香港 49:韓国 50:台湾
	- 51:タイ 52:インドネシア 53:シンガポール 54:フィリピン 55:マカオ 56:アメリカ 57:海外
	*/

	// 変数宣言
	var pref_id = 24; // 変更箇所(調べたい県に変更してください)
	var dj_name = 'T*CHA' // 変更箇所(自身のDJ Nameに変更してください)

	var header_ = {'Accept' : '*/*', 'Content-Type': 'application/x-www-form-urlencoded', 'Upgrade-Insecure-Requests': 1};
	var url = 'https://p.eagate.573.jp/game/2dx/28/ranking/json/topranker.html'
	var leggendaria_count = 0;
	var another_count = 0;
	var hyper_count = 0;
	var normal_count = 0;
	var version = 28;

	// json解析
	function getscore(obj){
		let length = obj.list.length;
		var count = 0;
		for (let i=0; i<length; i++) {
			normal_djname = obj.list[i].name_1;
			normal_score = obj.list[i].score_1;
			hyper_djname = obj.list[i].name_2;
			hyper_score = obj.list[i].score_2;
			another_djname = obj.list[i].name_3;
			another_score = obj.list[i].score_3;
			leg_djname = obj.list[i].name_4;
			leg_score = obj.list[i].score_4;
			musicname = obj.list[i].music;
			
			if (another_djname == dj_name){
				another_count += 1;
				console.log("Another 曲名:" + "%s", musicname);
			}
			if (hyper_djname == dj_name){
				hyper_count += 1;
				console.log("Hyper 曲名:" + "%s", musicname);
			}
			if (normal_djname == dj_name){
				normal_count += 1;
				console.log("Normal 曲名:" + "%s", musicname);
			}
			if (leg_djname == dj_name){
				leggendaria_count += 1;
				console.log("墓 曲名:" + "%s", musicname);
			}
		}
	}

	// json取得
	function getjson(){
		var postapi = (cnt) => {
			var body = 'pref_id=' + pref_id + '&play_style=0&series_id=' + cnt + '&limit=5000';
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
				var READYSTATE_COMPLETED = 4;
				var HTTP_STATUS_OK = 200;

				if( this.readyState == READYSTATE_COMPLETED
				&& this.status == HTTP_STATUS_OK )
				{
					var result = JSON.parse(this.responseText);
					getscore(result);
					if( cnt < version ) {
						postapi(cnt+1); // 再帰
					}
					else{
						console.log("墓 Top:" + "%d" + "曲", leggendaria_count);
						console.log("Another Top:" + "%d" + "曲", another_count);
						console.log("Hyper Top:" + "%d" + "曲", hyper_count);
						console.log("Normal Top:" + "%d" + "曲", normal_count);
					}
				}
			}
			xhr.open('POST', url);
			xhr.setRequestHeader('Accept', '*/*');
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.setRequestHeader('Upgrade-Insecure-Requests', 1);
			xhr.send(body);
		}
		postapi(0);
		}
	getjson();
}
)();


/* 参考サイト
【xhr複数処理の時間解決】
https://yukimonkey.com/fix-error/js-error-3/

【JavaScriptで要ログインサイトのデータ収集サービスを作ってみる】
https://qiita.com/Teara/items/33dd70984b641661f77b (part1)

【Bookmarklet】
https://qiita.com/kanaxx/items/63debe502aacd73c3cb8 (準備)
https://qiita.com/kanaxx/items/265aee04e479a5a40e51 (ajax)

*/
