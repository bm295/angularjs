import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent house feature', () => {
  let fixture: ComponentFixture<AppComponent>;
  let root: HTMLElement;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [AppComponent]
    }).compileComponents();
  });

  afterEach(() => {
    localStorage.clear();
  });

  function renderGame(): void {
    fixture = TestBed.createComponent(AppComponent);
    root = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  }

  function find<T extends Element>(selector: string): T {
    const element = root.querySelector<T>(selector);
    expect(element).withContext(`Expected to find ${selector}`).not.toBeNull();
    return element as T;
  }

  function click(selector: string): void {
    find<HTMLButtonElement>(selector).click();
    fixture.detectChanges();
  }

  function clickButtonContaining(containerSelector: string, label: string): void {
    const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>(`${containerSelector} button`));
    const button = buttons.find(candidate => candidate.textContent?.includes(label));
    expect(button).withContext(`Expected a button containing “${label}” in ${containerSelector}`).toBeDefined();
    button?.click();
    fixture.detectChanges();
  }

  function enterHouse(): void {
    click('[aria-label="Vào căn nhà"]');
    expect(root.querySelector('[aria-label="Bên trong căn nhà"]')).not.toBeNull();
  }

  function validSavedState(overrides: Record<string, unknown> = {}): Record<string, unknown> {
    return {
      farmerName: 'Pete', farmName: 'Mộc Lan', day: 3, season: 0, year: 1, time: 390,
      weather: 'Nắng', tomorrowWeather: 'Mưa', money: 500, stamina: 100, wood: 6,
      logAvailable: true, seeds: 6, turnips: 0, affection: 0, houseLevel: 1,
      controlPreset: 'classic', mealsCooked: 0, orderedItems: [],
      plots: Array.from({ length: 12 }, (_, id) => ({ id, state: id < 3 ? 'tilled' : 'empty', watered: false, growth: 0 })),
      ...overrides
    };
  }

  it('shows the five starting furnishings and keeps level-three rooms locked', () => {
    renderGame();
    enterHouse();

    const startingFurnishings = [
      '[aria-label="Ngủ trên chiếc giường đơn"]',
      '[aria-label="Dùng kệ sách để đổi điều khiển"]',
      '[aria-label="Mở thùng dụng cụ"]',
      '[aria-label="Xem tivi"]',
      '[aria-label="Mở cuốn nhật ký để lưu game"]'
    ];

    for (const selector of startingFurnishings) {
      expect(root.querySelector(selector)).withContext(`Missing starting furnishing ${selector}`).not.toBeNull();
    }
    expect(root.querySelector('[aria-label="Ngủ trên chiếc giường đôi của gia đình"]')).toBeNull();
    expect(root.querySelector('[aria-label="Vào nhà bếp để nấu ăn"]')).toBeNull();
    expect(root.querySelector('.locked-extension')?.textContent).toContain('Mở khóa ở nhà cấp 3');
  });

  it('changes the active key bindings from the bookshelf', () => {
    renderGame();
    enterHouse();
    click('[aria-label="Dùng kệ sách để đổi điều khiển"]');

    expect(find<HTMLElement>('[role="dialog"] h2').textContent).toContain('Chọn kiểu điều khiển');
    clickButtonContaining('.preset-grid', 'WASD');
    expect(find<HTMLElement>('.preset-grid button.selected').textContent).toContain('WASD');

    click('[aria-labelledby="controls-title"] [aria-label="Đóng"]');
    root.dispatchEvent(new KeyboardEvent('keydown', { key: 'd', bubbles: true, cancelable: true }));
    fixture.detectChanges();

    expect(find<HTMLElement>('.message p').textContent).toContain('Đã chọn Cuốc');
  });

  it('stores every starting tool in the toolbox and equips one through the panel', () => {
    renderGame();
    enterHouse();
    click('[aria-label="Mở thùng dụng cụ"]');

    const toolButtons = root.querySelectorAll<HTMLButtonElement>('.tool-grid button');
    expect(toolButtons.length).toBe(6);
    expect(find<HTMLElement>('.toolbox-panel').textContent).toContain('Hạt giống');
    expect(find<HTMLElement>('.toolbox-panel').textContent).toContain('6');

    clickButtonContaining('.tool-grid', 'Rìu');
    expect(root.querySelector('.toolbox-panel')).toBeNull();
    expect(find<HTMLElement>('.message p').textContent).toContain('Bạn lấy Rìu từ thùng dụng cụ');
  });

  it('broadcasts Shopping Channel only on Saturday and completes an order', () => {
    renderGame();
    enterHouse();
    click('[aria-label="Xem tivi"]');
    clickButtonContaining('.channel-tabs', 'Shopping');

    expect(find<HTMLElement>('.channel-off').textContent).toContain('chỉ lên sóng vào Thứ Bảy');

    click('[aria-labelledby="tv-title"] [aria-label="Tắt tivi"]');
    click('[aria-label="Ngủ trên chiếc giường đơn"]');
    click('[aria-label="Ngủ trên chiếc giường đơn"]');
    click('[aria-label="Ngủ trên chiếc giường đơn"]');
    click('[aria-label="Xem tivi"]');
    clickButtonContaining('.channel-tabs', 'Shopping');

    expect(root.querySelector('.channel-off')).toBeNull();
    expect(root.querySelectorAll('.product-list article').length).toBe(3);
    clickButtonContaining('.product-list article', 'Đặt mua');
    expect(find<HTMLElement>('[title="Hạt giống"]').textContent).toContain('18');
    expect(find<HTMLElement>('.message p').textContent).toContain('Shopping Channel');
  });

  it('reveals the family bed and kitchen when a level-three journal save is loaded', () => {
    localStorage.setItem('moc-lan-farm-journal-v2', JSON.stringify({
      game: 'Moc Lan Farm',
      version: 2,
      savedAt: '2026-07-31T12:00:00.000Z',
      state: validSavedState({ houseLevel: 3 })
    }));
    renderGame();
    enterHouse();
    click('[aria-label="Mở cuốn nhật ký để lưu game"]');
    clickButtonContaining('.journal-panel', 'Đọc trang đã lưu');
    click('[aria-labelledby="journal-title"] [aria-label="Đóng"]');

    expect(root.querySelector('[aria-label="Ngủ trên chiếc giường đôi của gia đình"]')).not.toBeNull();
    expect(root.querySelector('[aria-label="Vào nhà bếp để nấu ăn"]')).not.toBeNull();
    expect(root.querySelector('[aria-label="Gia đình của bạn"]')).not.toBeNull();
  });

  it('rejects a partial journal save instead of replacing the current run with defaults', () => {
    localStorage.setItem('moc-lan-farm-journal-v2', JSON.stringify({
      game: 'Moc Lan Farm', version: 2, savedAt: 'not-a-date', state: {}
    }));
    renderGame();
    enterHouse();
    click('[aria-label="Mở cuốn nhật ký để lưu game"]');

    const loadButton = Array.from(root.querySelectorAll<HTMLButtonElement>('.journal-panel button'))
      .find(button => button.textContent?.includes('Đọc trang đã lưu'));
    expect(loadButton?.disabled).toBeTrue();
    expect(find<HTMLElement>('.journal-panel').textContent).toContain('Chưa có trang nhật ký nào được lưu');
  });
});
