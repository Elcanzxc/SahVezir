export type Language = 'ru' | 'en';
export type Theme = 'dark' | 'light';

export const translations = {
  ru: {
    appTitle: '3×3: Обмен Фигур',
    appSubtitle: 'Классические шахматные головоломки: задача Гуарини и вариация с ферзями',
    desktopEdition: 'Desktop Edition',
    help: 'Справка',
    solutionsInfo: 'О решениях',

    // Modes
    gameMode: 'Режим игры',
    queensMode: 'Ферзи (6 ходов)',
    knightsMode: 'Кони Гуарини (16)',

    // Stats
    moveCounter: 'Счетчик ходов',
    goal: 'цель',
    statusVictory: 'Победа!',
    statusOptimal: '⭐ Идеально!',
    statusStart: 'Начало',
    statusOnTrack: 'В темпе цели',
    statusOverGoal: (diff: number) => `+${diff} от мин.`,

    // Board
    boardTitle: 'Доска 3×3 (a1–c3)',
    boardHintSolving: 'Режим демонстрации...',
    boardHintSelect: 'Клик по фигуре для выбора',
    whiteGoal: 'Цель ⚪',
    blackGoal: 'Цель ⚫',
    whitePiece: 'Белые',
    blackPiece: 'Черные',

    // Buttons
    solveBtn: 'Решение',
    stopBtn: 'Остановить',
    resetBtn: 'Сброс',
    undoBtn: 'Назад (Undo)',
    speedLabel: 'Скорость:',

    // Info cards
    queensRuleTitle: 'Правила ферзей:',
    queensRuleDesc: 'Ферзи перемещаются по вертикали, горизонтали и диагонали на свободные клетки. Не могут рубить и перепрыгивать другие фигуры.',
    knightsRuleTitle: 'Задача Гуарини (1512 г.):',
    knightsRuleDesc: 'Кони ходят буквой «Г» на пустые клетки. Центральная клетка b2 коням недоступна! Фигуры двигаются по замкнутому 8-циклу.',

    // Victory modal
    victoryTitle: 'Победа!',
    victoryDesc: 'Белые и черные фигуры успешно поменялись местами!',
    movesMade: 'Сделано ходов',
    minimum: 'Минимум',
    optimalBadge: 'Идеальное решение без лишних ходов!',
    goodBadge: (min: number) => `Отличный результат! Попробуйте за ${min} ходов!`,
    playAgain: 'Сыграть снова',
    switchToMode: (modeName: string) => `Перейти в режим: ${modeName}`,
    queensName: 'Ферзи',
    knightsName: 'Кони Гуарини',

    // Help modal
    helpTitle: 'О головоломке и математике задачи',
    mainGoalTitle: 'Главная цель',
    mainGoalDesc: 'Поменять местами белые фигуры (в начале стоят снизу на a1 и c1) и черные фигуры (сверху на a3 и c3). Фигуры белых должны занять клетки a3 и c3, а черные — a1 и c1.',
    rulesTitle: 'Общие ограничения:',
    rule1: 'На одной клетке может находиться только одна фигура.',
    rule2: 'Фигуры не могут рубить друг друга (ход только на свободную клетку).',
    rule3: 'Ходы совершаются строго по шахматным правилам.',

    // "Is there only 1 solution?" section
    uniquenessTitle: 'Только ли одно решение у задачи?',
    uniquenessIntro: 'Нет, решений не одно! Существует множество вариантов:',
    uniquenessQueens: 'Для Ферзей (6 ходов): существует как минимум 4 различных симметричных минимальных решения (начиная с левого или правого фланга, либо начиная ход белыми снизу: a3→b2 или c3→b2 или a1→b2 или c1→b2).',
    uniquenessKnights: 'Для Коней (16 ходов): кони двигаются по графу-кольцу из 8 вершин. Движение возможно как по часовой стрелке, так и против часовой стрелки! Кроме того, внутри каждого круга ходов порядок перемещения 4 коней может варьироваться.',
    uniquenessSuboptimal: 'Если не ограничиваться минимальным числом ходов, возможных решений бесконечно много.',

    understoodBtn: 'Понятно, к игре!',
  },
  en: {
    appTitle: '3×3: Pieces Exchange',
    appSubtitle: 'Classic chess puzzles: Guarini\'s problem & Queens variation',
    desktopEdition: 'Desktop Edition',
    help: 'Help',
    solutionsInfo: 'Solutions Info',

    // Modes
    gameMode: 'Game Mode',
    queensMode: 'Queens (6 moves)',
    knightsMode: 'Guarini Knights (16)',

    // Stats
    moveCounter: 'Move Counter',
    goal: 'goal',
    statusVictory: 'Victory!',
    statusOptimal: '⭐ Optimal!',
    statusStart: 'Start',
    statusOnTrack: 'On track',
    statusOverGoal: (diff: number) => `+${diff} from min`,

    // Board
    boardTitle: 'Board 3×3 (a1–c3)',
    boardHintSolving: 'Demonstration mode...',
    boardHintSelect: 'Click on a piece to select',
    whiteGoal: 'Goal ⚪',
    blackGoal: 'Goal ⚫',
    whitePiece: 'White',
    blackPiece: 'Black',

    // Buttons
    solveBtn: 'Auto-Solve',
    stopBtn: 'Stop',
    resetBtn: 'Reset',
    undoBtn: 'Undo Move',
    speedLabel: 'Speed:',

    // Info cards
    queensRuleTitle: 'Queens Rules:',
    queensRuleDesc: 'Queens move horizontally, vertically, and diagonally into empty squares. They cannot capture or jump over other pieces.',
    knightsRuleTitle: 'Guarini\'s Problem (1512):',
    knightsRuleDesc: 'Knights move in an L-shape into empty squares. The central square b2 is unreachable for knights! Pieces move along a closed 8-cycle.',

    // Victory modal
    victoryTitle: 'Victory!',
    victoryDesc: 'White and black pieces have successfully swapped places!',
    movesMade: 'Moves Made',
    minimum: 'Minimum',
    optimalBadge: 'Perfect solution with minimal moves!',
    goodBadge: (min: number) => `Great job! Can you solve it in ${min} moves?`,
    playAgain: 'Play Again',
    switchToMode: (modeName: string) => `Switch to: ${modeName}`,
    queensName: 'Queens',
    knightsName: 'Guarini Knights',

    // Help modal
    helpTitle: 'About the Puzzle & Mathematics',
    mainGoalTitle: 'Main Objective',
    mainGoalDesc: 'Swap the white pieces (originally at bottom a1 and c1) with the black pieces (at top a3 and c3). White pieces must reach a3 & c3, and black pieces must reach a1 & c1.',
    rulesTitle: 'General Rules:',
    rule1: 'Only one piece per square.',
    rule2: 'Pieces cannot capture each other (move only to vacant squares).',
    rule3: 'Moves must strictly follow standard chess piece rules.',

    // "Is there only 1 solution?" section
    uniquenessTitle: 'Is there only one solution?',
    uniquenessIntro: 'No, the solution is NOT unique! There are multiple ways to solve it:',
    uniquenessQueens: 'For Queens (6 moves): There are at least 4 distinct symmetrical minimal 6-move solutions (starting from left vs right flank, or starting with white from the bottom: a3→b2, c3→b2, a1→b2, or c1→b2).',
    uniquenessKnights: 'For Knights (16 moves): Knights navigate an 8-vertex cycle graph. The movement can proceed clockwise OR counter-clockwise! Additionally, within each round of 4 moves, the order in which individual knights move can vary.',
    uniquenessSuboptimal: 'Without the strict minimum move constraint, there are infinitely many valid solution sequences.',

    understoodBtn: 'Got it, let\'s play!',
  },
};

