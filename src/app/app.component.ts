import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

type ToolId = 'hand' | 'hoe' | 'seeds' | 'can' | 'axe' | 'hammer';
type PlotState = 'empty' | 'tilled' | 'seeded' | 'growing' | 'ready';

interface Plot {
  id: number;
  state: PlotState;
  watered: boolean;
  growth: number;
}

interface GameState {
  farmerName: string;
  farmName: string;
  day: number;
  season: number;
  year: number;
  time: number;
  weather: 'Nắng' | 'Mưa';
  money: number;
  stamina: number;
  wood: number;
  seeds: number;
  turnips: number;
  affection: number;
  plots: Plot[];
}

interface Tool {
  id: ToolId;
  icon: string;
  label: string;
}

const FRESH_GAME: GameState = {
  farmerName: 'Pete', farmName: 'Mộc Lan', day: 3, season: 0, year: 1,
  time: 390, weather: 'Nắng', money: 500, stamina: 100, wood: 6,
  seeds: 6, turnips: 0, affection: 0,
  plots: Array.from({ length: 12 }, (_, id) => ({ id, state: id < 3 ? 'tilled' : 'empty', watered: false, growth: 0 }))
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected readonly seasons = ['Xuân', 'Hạ', 'Thu', 'Đông'];
  protected readonly selectedTool = signal<ToolId>('hand');
  protected readonly state = signal<GameState>(structuredClone(FRESH_GAME));
  protected readonly notice = signal('Một ngày mới bắt đầu. Hãy chăm sóc nông trại của bạn!');
  protected readonly showGuide = signal(false);
  protected readonly showMenu = signal(false);
  protected readonly tools: Tool[] = [
    { id: 'hand', icon: '✋', label: 'Tay không' },
    { id: 'hoe', icon: '⛏️', label: 'Cuốc' },
    { id: 'seeds', icon: '🌱', label: 'Hạt củ cải' },
    { id: 'can', icon: '💧', label: 'Bình tưới' },
    { id: 'axe', icon: '🪓', label: 'Rìu' },
    { id: 'hammer', icon: '🔨', label: 'Búa' }
  ];
  protected readonly clock = computed(() => {
    const time = this.state().time;
    const hour = Math.floor(time / 60);
    return `${String(hour).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`;
  });
  protected readonly selectedLabel = computed(() => this.tools.find(tool => tool.id === this.selectedTool())?.label ?? '');

  protected selectTool(tool: ToolId): void {
    this.selectedTool.set(tool);
    this.notice.set(`Đã chọn ${this.tools.find(item => item.id === tool)?.label}.`);
  }

  protected interact(plotId: number): void {
    const game = structuredClone(this.state());
    const plot = game.plots[plotId];
    const tool = this.selectedTool();
    let message = 'Công cụ này không dùng được ở đây.';
    let cost = 0;

    if (tool === 'hoe' && plot.state === 'empty') {
      plot.state = 'tilled'; cost = 4; message = 'Bạn đã cuốc một ô đất mới.';
    } else if (tool === 'seeds' && plot.state === 'tilled' && game.seeds > 0) {
      plot.state = 'seeded'; game.seeds--; cost = 2; message = 'Hạt củ cải đã được gieo xuống.';
    } else if (tool === 'can' && ['seeded', 'growing'].includes(plot.state) && !plot.watered) {
      plot.watered = true; cost = 2; message = 'Mảnh đất đã được tưới mát.';
    } else if (tool === 'hand' && plot.state === 'ready') {
      plot.state = 'tilled'; plot.growth = 0; plot.watered = false; game.turnips++; message = 'Thu hoạch củ cải! Hãy bán nó để kiếm tiền.';
    } else if (tool === 'seeds' && game.seeds === 0) {
      message = 'Bạn đã hết hạt giống. Ghé cửa hàng để mua thêm nhé.';
    }

    if (cost && game.stamina < cost) {
      this.notice.set('Bạn đã kiệt sức. Hãy kết thúc ngày để nghỉ ngơi.');
      return;
    }
    game.stamina -= cost;
    if (cost) game.time = Math.min(1430, game.time + 10);
    this.state.set(game);
    this.notice.set(message);
  }

  protected chopWood(): void {
    const game = structuredClone(this.state());
    if (this.selectedTool() !== 'axe') { this.notice.set('Hãy chọn Rìu để chặt khúc gỗ này.'); return; }
    if (game.stamina < 6) { this.notice.set('Bạn không còn đủ sức.'); return; }
    game.wood += 2; game.stamina -= 6; game.time += 10;
    this.state.set(game); this.notice.set('Bạn nhận được 2 Gỗ. Khúc gỗ mới sẽ xuất hiện vào ngày mai.');
  }

  protected buySeeds(): void {
    const game = structuredClone(this.state());
    if (game.money < 120) { this.notice.set('Bạn không đủ tiền mua hạt giống.'); return; }
    game.money -= 120; game.seeds += 6; this.state.set(game);
    this.notice.set('Đã mua một túi 6 hạt củ cải với giá 120G.');
  }

  protected sellProduce(): void {
    const game = structuredClone(this.state());
    if (!game.turnips) { this.notice.set('Túi đồ chưa có nông sản để bán.'); return; }
    const earned = game.turnips * 60; game.money += earned; game.turnips = 0; this.state.set(game);
    this.notice.set(`Zack đã nhận hàng. Bạn kiếm được ${earned}G!`);
  }

  protected talkToEllie(): void {
    const game = structuredClone(this.state());
    game.affection = Math.min(100, game.affection + 2); this.state.set(game);
    this.notice.set('Ellie: “Buổi sáng ở nông trại thật dễ chịu. Đừng làm việc quá sức nhé!”  ♥ +2');
  }

  protected nextDay(): void {
    const game = structuredClone(this.state());
    for (const plot of game.plots) {
      if (plot.watered || game.weather === 'Mưa') {
        plot.growth++;
        if (plot.state === 'seeded') plot.state = 'growing';
        if (plot.growth >= 3 && plot.state === 'growing') plot.state = 'ready';
      }
      plot.watered = false;
    }
    game.day++;
    if (game.day > 30) { game.day = 1; game.season++; }
    if (game.season > 3) { game.season = 0; game.year++; }
    game.time = 360; game.stamina = 100;
    game.weather = Math.random() > 0.72 ? 'Mưa' : 'Nắng';
    this.state.set(game); this.notice.set(`Ngày ${game.day} đã bắt đầu. Dự báo hôm nay: ${game.weather}.`);
  }

  protected saveGame(): void {
    const payload = { game: 'Moc Lan Farm', version: 1, savedAt: new Date().toISOString(), state: this.state() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = `moc-lan-farm-day-${this.state().day}.save.json`; anchor.click();
    URL.revokeObjectURL(url); this.notice.set('Đã lưu game xuống ổ cứng. Hãy giữ file .save.json cẩn thận!'); this.showMenu.set(false);
  }

  protected loadGame(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const payload = JSON.parse(String(reader.result));
        if (payload.game !== 'Moc Lan Farm' || !Array.isArray(payload.state?.plots)) throw new Error();
        this.state.set(payload.state); this.notice.set(`Đã tải bản lưu ngày ${payload.state.day}. Chào mừng bạn trở lại!`); this.showMenu.set(false);
      } catch { this.notice.set('File lưu không hợp lệ hoặc đã bị hỏng.'); }
      input.value = '';
    };
    reader.readAsText(file);
  }

  protected newGame(): void {
    if (!confirm('Bắt đầu lại từ đầu? Tiến trình chưa lưu sẽ bị mất.')) return;
    this.state.set(structuredClone(FRESH_GAME)); this.notice.set('Chào mừng tới Nông trại Mộc Lan!'); this.showMenu.set(false);
  }
}
