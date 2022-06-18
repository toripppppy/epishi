const generator = document.getElementById('generate');
const questionArea = document.getElementById('karuta-area');
const amount = document.getElementById('amount');

let game = {
    curAmount: 22,
    maxAmount: 22,
    random: null,
};
//山札用配列
let karuta = [...Array(game.maxAmount)].map((_, i) => i + 1);

//生成ボタンクリック
generator.onclick = () => {
    questionArea.innerHTML = '';
    game.curAmount -= 1;

    //札残量表示
    amount.innerText = `${game.curAmount}/${game.maxAmount}`

    //-------------かるた作成--------------//
    //絵札HTML生成
    let q = document.createElement('img');
    q.setAttribute('id', 'question');
    questionArea.appendChild(q);

    if (game.curAmount >= 0) {
        //絵札・読み札を確定
        let get = karuta[Math.floor(Math.random() * karuta.length)];
        karuta = karuta.filter(n => n !== get);
        game.random = get;
    } else {
        //終了札を表示
        q.setAttribute('src', 'assets/images/end.png');
        amount.innerText = 'end';
        return;
    }
    //------------------------------------//
    generator.disabled = true;

    //読み上げ・絵札表示
    const play = () => setTimeout(() => {
        //読み上げ
        const audio = new Audio(`assets/sounds/${game.random}.mp3`);
        audio.play();
        //クリックで絵札表示
        addEventListener('click', () => {
            q.setAttribute('src', `assets/images/${game.random}.png`); 
        });
        generator.disabled = false;
    }, 2000);
    play()

    //スペースキーでもう一度読み上げ
    addEventListener('keypress', (e) => {
        if (e.key === ' ') {
            play();
            return;
        }
    });
}