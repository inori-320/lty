class GamePlayground{
    constructor(root){
        this.root = root;
        this.$playground = $(`
<div class = "game_playground">
</div>
        `);
        this.hide();
        this.root.$lty.append(this.$playground);

        this.start();
    }

    start(){
        let outer = this;
        $(window).resize(function() {
            outer.resize();
        });
    }

    resize(){
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        let unit = Math.min(this.width / 20, this.height / 9.5);
        this.width = unit * 20;
        this.height = unit * 9.5;
        this.scale = this.height;

        if(this.game_map) this.game_map.resize();
    }

    random_color() {
        let colors = ["blue", "green", "red", "white", "grey", "purple"];
        return colors[Math.floor(Math.random() * 6)];
    }

    show(mode){
        let outer = this;
        this.$playground.show();
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        this.game_map = new GameMap(this);
        this.resize();

        this.players = [];
        this.players.push(new Player(this, this.width / 2 / this.scale, 0.5 , 0.05, 0.2, "pink", "me", this.root.settings.username, this.root.settings.photo));
        if(mode === "single mode"){
            for(let i = 0; i < 5; i++){
                this.players.push(new Player(this, this.width / 2 / this.scale, 0.5, 0.05, 0.2, this.random_color(), "robot"));
            }
        } else {
            this.mps = new MultiPlayer(this);

            this.mps.ws.onopen = function(){
                outer.mps.send_create_player();
            }
        }
    }

    hide(){
        this.$playground.hide();
    }
}
