<template>
  <div class="lifeGame">
    <div class="gloss" style="color: #ff0000; font-size: 18px;">***警告，代码来自互联网（Warning, The Code is from the Internet）***</div>
    <table>
      <tr>
        <td align="left">
          Generation:
          <span id="spanGen">0</span>&nbsp;&nbsp;
          <a href="#" style="text-decoration:none">HTML5版本的生命游戏_Game of Life</a>
        </td>
        <td align="right">
          <button @click="startGame();" :disabled="btnStart">Start</button>
          <button @click="pauseGame();" :disabled="btnPause">Pause</button>
          <button @click="resetGame();" :disabled="btnReset">Reset</button>
          <button @click="randomGame();" :disabled="btnRandom">Random</button>
          <button @click="help();">What's this?</button>
        </td>
      </tr>
      <tr align="center">
        <td colspan="2">
          <canvas
            id="space"
            width="1400"
            height="1400"
            style="border: 1px solid; background-color: #eeeeee;"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      canvas: Object,
      context: Object,
      timerInterval: 10, // ms,
      cellWidth: 2, // please ensure: cellWidth > 2,
      cellXLen: 400, // please ensure: cellWidth * cellXLen = 800,
      cellYLen: 400, // please ensure: cellWidth * this.cellYLen = 800,
      cells: [],
      running: 0,
      generation: 0,
      btnStart: false,
      btnPause: false,
      btnReset: false,
      btnRandom: false,
    }
  },
  mounted () {
    this.spanGen = document.getElementById('spanGen');
    this.canvas = document.getElementById('space');
    this.context = this.canvas.getContext('2d');
    window.onload = () => {
      window.addEventListener("load", this.loadGame(), true);
    }
  },
  methods: {
    loadGame () {
      this.canvas.onmousedown = function (e) {
        if (this.running == 1) return;
        let x, y;
        if (e.offsetX) {
          x = e.offsetX;
          y = e.offsetY;
        } else if (e.layerX) {
          x = e.layerX;
          y = e.layerY;
        }
        x = Math.floor(x / this.cellWidth);
        y = Math.floor(y / this.cellWidth);
        let state = this.cells[[x, y]];
        if (state && state == 1) {
          this.cells[[x, y]] = 0;
          this.drawCell(x, y, 0);
        } else {
          this.cells[[x, y]] = 1;
          this.drawCell(x, y, 1);
        }
      }
      this.drawPatterns();
    },
    drawPatterns () {
      for (let i = 0; i < 200; i++) {
        this.setCell(i + 100, 200);
      }
    },
    drawCell (x, y, state) {
      var cx = x * this.cellWidth;
      var cy = y * this.cellWidth;
      if (state && state == 1) {
        this.context.fillStyle = "Gold";
        this.context.fillRect(cx, cy, this.cellWidth, this.cellWidth);
        this.context.strokeStyle = "DarkGoldenRod";
        this.context.strokeRect(cx + 1, cy + 1, this.cellWidth - 2, this.cellWidth - 2);
      } else {
        this.context.clearRect(cx, cy, this.cellWidth, this.cellWidth);
      }
    },
    setCell (x, y) {
      this.cells[[x, y]] = 1;
      this.drawCell(x, y, 1);
    },
    applyRule (x, y) {
      var neighbours = [];
      var neighbourCount = 0;
      var currentState = this.cells[[x, y]];
      // var nextState = 0;
      neighbours[0] = this.cells[[(x - 1 + this.cellXLen) % this.cellXLen, (y - 1 + this.cellYLen) % this.cellYLen]];
      neighbours[1] = this.cells[[(x - 1 + this.cellXLen) % this.cellXLen, (y + 1 + this.cellYLen) % this.cellYLen]];
      neighbours[2] = this.cells[[(x + this.cellXLen) % this.cellXLen, (y + 1 + this.cellYLen) % this.cellYLen]];
      neighbours[3] = this.cells[[(x + this.cellXLen) % this.cellXLen, (y - 1 + this.cellYLen) % this.cellYLen]];
      neighbours[4] = this.cells[[(x + 1 + this.cellXLen) % this.cellXLen, (y + 1 + this.cellYLen) % this.cellYLen]];
      neighbours[5] = this.cells[[(x + 1 + this.cellXLen) % this.cellXLen, (y - 1 + this.cellYLen) % this.cellYLen]];
      neighbours[6] = this.cells[[(x + 1 + this.cellXLen) % this.cellXLen, (y + this.cellYLen) % this.cellYLen]];
      neighbours[7] = this.cells[[(x - 1 + this.cellXLen) % this.cellXLen, (y + this.cellYLen) % this.cellYLen]];
      for (let i = 0; i < 8; i++) {
        let state = neighbours[i];
        if (state && state == 1) neighbourCount++;
      }
      if (currentState && currentState == 1) {
        if (neighbourCount < 2 || neighbourCount > 3) return 0;
        else return 1;
      } else {
        if (neighbourCount == 3) return 1;
        else return 0;
      }
    },
    startGame () {
      let that = this;
      function runGame () {
        let nextgen = [];
        for (let x = 0; x < that.cellXLen; x++) {
          for (let y = 0; y < that.cellYLen; y++) {
            nextgen[[x, y]] = that.applyRule(x, y);
          }
        }
        for (let x = 0; x < that.cellXLen; x++) {
          for (let y = 0; y < that.cellYLen; y++) {
            that.cells[[x, y]] = nextgen[[x, y]];
          }
        }
        for (let x = 0; x < that.cellXLen; x++) {
          for (let y = 0; y < that.cellYLen; y++) {
            that.drawCell(x, y, that.cells[[x, y]]);
          }
        }
        that.generation++;
        that.spanGen.innerHTML = that.generation;
        if (that.running == 1) setTimeout(runGame, that.timerInterval);
      }
      this.running = 1;
      this.btnStart = true;
      this.btnPause = false;
      this.btnReset = true;
      this.btnRandom = true;
      runGame();
    },
    pauseGame () {
      this.running = 0;
      this.btnStart = false;
      this.btnPause = true;
      this.btnReset = false;
      this.btnRandom = false;
    },
    resetGame () {
      for (let x = 0; x < this.cellXLen; x++) {
        for (let y = 0; y < this.cellYLen; y++) {
          this.cells[[x, y]] = 0;
          this.drawCell(x, y, 0);
        }
      }
      this.drawPatterns();
      this.generation = 0;
      this.spanGen.innerHTML = this.generation;
    },
    randomGame () {
      for (let x = 0; x < this.cellXLen; x++) {
        for (let y = 0; y < this.cellYLen; y++) {
          let s = (Math.random() >= 0.8) ? 1 : 0;
          this.cells[[x, y]] = s;
          this.drawCell(x, y, s);
        }
      }
      this.generation = 0;
      this.spanGen.innerHTML = this.generation;
    },
    help () {
      window.open("http://en.wikipedia.org/wiki/Conway's_Game_of_Life");
    }
  },
  watch: {},
  computed: {},
}
</script>
<style scoped>
.lifeGame {
  margin: 0 auto;
}
table {
  margin: 0 auto;
}
</style>