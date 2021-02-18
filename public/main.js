var app = new Vue({
  el: "#app",
  data() {
    return {
      form: {
        displayName: "",
        userId: "",
        statusMessage: "",
        pictureUrl: "",
        obnizId: "",
      },
    };
  },

  methods: {
    //プロフィール取得関数
    getProfile: async function () {
      const accessToken = liff.getAccessToken();
      const profile = await liff.getProfile();
      this.form.displayName = profile.displayName; //LINEの名前
      this.form.userId = profile.userId; //LINEのID
      this.form.pictureUrl = profile.pictureUrl; //LINEのアイコン画像
      this.form.statusMessage = profile.statusMessage; //LINEのステータスメッセージ
    },
  },

  //ページを開いた時に実行される
  mounted: async function () {
    await liff.init({
      liffId: "1655673745-xPEXoDJP", 
    });

    //LINE内のブラウザかどうか
    if (liff.isInClient()) {
      alert("LINE内のブラウザ");
      this.getProfile(); //LINE内で開いた場合は特にログイン処理なしで大丈夫
    } else {
      //外部ブラウザかどうか
      if (liff.isLoggedIn()) {
        alert("外部ブラウザ");
        this.getProfile();
      } else {
        liff.login();
      }
    }
  },

  computed: {
    validation() {
      const form = this.form;
      return {
        displayName: !!form.displayName,
        obnizId: !!form.obnizId,
      };
    },
    isValid() {
      var validation = this.validation;
      return Object.keys(validation).every(function (key) {
        return validation[key];
      });
    },
  },
});
