"use strict";

/* Справочник подклассов D&D 5e */
const SUBCLASSES = {
    Бард: [
        "Коллегия доблести",
        "Коллегия знаний",
        "Коллегия мечей",
        "Коллегия очарования",
        "Коллегия шёпотов",
        "Коллегия красноречия",
        "Коллегия созиданий",
        "Коллегия духов",
    ],
    Варвар: [
        "Путь берсерка",
        "Путь тотемного воина",
        "Путь бушующего в бою",
        "Путь буревестника",
        "Путь предка-хранителя",
        "Путь фанатика",
        "Путь дикой магии",
        "Путь зверя",
        "Путь великана",
    ],
    Воин: [
        "Мастер боевых искусств",
        "Мистический рыцарь",
        "Чемпион",
        "Рыцарь Пурпурного дракона",
        "Кавалерист",
        "Мистический лучник",
        "Самурай",
        "Рыцарь эха",
    ],
    Волшебник: [
        "Школа Воплощения",
        "Школа Вызова",
        "Школа Иллюзии",
        "Школа Некромантии",
        "Школа Ограждения",
        "Школа Очарования",
        "Школа Преобразования",
        "Школа Прорицания",
        "Военная магия",
        "Школа хронургии",
        "Школа гравитургии",
        "Орден писцов",
        "Песнь клинка",
    ],
    Друид: [
        "Круг земли",
        "Круг луны",
        "Круг пастыря",
        "Круг снов",
        "Круг дикого огня",
        "Круг звёзд",
        "Круг спор",
    ],
    Жрец: [
        "Домен бури",
        "Домен войны",
        "Домен жизни",
        "Домен знаний",
        "Домен обмана",
        "Домен природы",
        "Домен света",
        "Домен смерти",
        "Домен магии",
    ],
    Изобретатель: [
        "Алхимик",
        "Артиллерист",
        "Боевой кузнец",
        "Бронник"
    ],
    Колдун: [
        "Архифея",
        "Исчадие",
        "Великий Древний",
        "Бессмертный",
        "Ведьмовской клинок",
        "Небожитель",
        "Бездонный",
        "Гений",
        "Нежить",
    ],
    Монах: [
        "Путь открытой ладони",
        "Путь тени",
        "Путь четырёх стихий",
        "Путь долгой смерти",
        "Путь кэнсэя",
        "Путь пьяного мастера",
        "Путь солнечной души",
        "Путь астрального тела",
        "Путь милосердия",
        "Путь восходящего дракона",
    ],
    Паладин: [
        "Клятва преданности",
        "Клятва древних",
        "Клятва мести",
        "Клятвопреступник",
        "Клятва короны",
        "Клятва искупления",
        "Клятва покорения",
        "Клятва славы",
    ],
    Плут: [
        "Вор",
        "Убийца",
        "Мистический ловкач",
        "Дуэлянт",
        "Комбинатор",
        "Скаут",
        "Сыщик",
        "Фантом",
        "Клинок души",
    ],
    Следопыт: [
        "Охотник",
        "Повелитель зверей",
        "Странник горизонта",
        "Сумрачный охотник",
        "Убийца чудовищ",
        "Странник фей",
        "Хранитель роя",
        "Наездник на дрейке",
    ],
    Чародей: [
        "Наследие драконьей крови",
        "Дикая магия",
        "Божественная душа",
        "Теневая магия",
        "Штормовое колдовство",
        "Аберрантный разум",
        "Заводная душа",
        "Лунное чародейство",
    ],
};

class WatchApplication {
    // Счётчик заявок
    static counter = 0;

    // Стартовый уровень кампании
    static START_LEVEL = 7;

    constructor(data) {
        WatchApplication.counter += 1;
        this.id = WatchApplication.counter; // номер заявки
        this.heroName = data.heroName;
        this.charClass = data.charClass; // выпадающий список классов
        this.charSubclass = data.charSubclass; // список подклассов
        this.level = WatchApplication.START_LEVEL;
        this.experience = data.experience; // радиокнопки
        this.sessionsPerMonth = Number(data.sessionsPerMonth); // ползунок
        this.email = data.email;
        this.story = (data.story || "").trim() || "—"; // многострочное поле
        this.consent = data.consent === "on"; // галочка согласия
        this.submittedAt = new Date(); // время отправки
    }

    printToConsole() {
        const rootStyles = getComputedStyle(document.documentElement);
        const amethyst = rootStyles.getPropertyValue("--amethyst").trim();
        const gold = rootStyles.getPropertyValue("--gold").trim();

        console.log(
            "%cАметистовый дозор — новая заявка",
            "color: " + gold + "; font-size: 16px; font-weight: bold;",
        );
        console.log(
            "Заявка №" + this.id + " от " + this.submittedAt.toLocaleString("ru-RU"),
            "color: " + amethyst + ";",
        );

        console.table({
            "Имя героя": this.heroName,
            Класс: this.charClass,
            Подкласс: this.charSubclass,
            Уровень: this.level,
            Опыт: this.experience,
            "Сессий в месяц": this.sessionsPerMonth,
            Почта: this.email,
            Предыстория: this.story,
            "Согласие на обработку": this.consent ? "дано" : "нет",
        });
    }
}

/* ================================================================
   Связка формы и сценария
   ================================================================ */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".application-form");
    const charClassSelect = form.elements.charClass;
    const subclassSelect = form.elements.charSubclass;
    const range = form.elements.sessionsPerMonth;
    const rangeOutput = document.getElementById("sessions-output");
    const status = document.getElementById("form-status");

    // Перестроить список подклассов по выбранному классу
    function renderSubclasses(subclasses) {
        const ready = subclasses.length > 0;

        subclassSelect.innerHTML = "";
        const placeholder = new Option(
            ready ? "Выберите подкласс" : "Сначала выберите класс",
            "",
        );
        placeholder.disabled = true; // заглушку нельзя выбрать
        placeholder.selected = true; // показывается в закрытом поле
        placeholder.hidden = true; // Показывать заглушку не нужно
        subclassSelect.append(placeholder);

        for (const name of subclasses) {
            subclassSelect.append(new Option(name, name));
        }
        subclassSelect.disabled = !ready;
    }

    /* Исправление бага, при котором после выбора чего-то в списке
         подсветка не сбрасывалась */
    function resetFocusAfterMouseChoice(select) {
        let chosenByMouse = false;

        select.addEventListener("pointerdown", () => {
            chosenByMouse = true;
        });
        select.addEventListener("keydown", () => {
            chosenByMouse = false;
        });
        select.addEventListener("change", () => {
            if (chosenByMouse) select.blur();
            chosenByMouse = false;
        });
    }

    // Выбор подкласса в зависимости от класса
    charClassSelect.addEventListener("change", () => {
        renderSubclasses(SUBCLASSES[charClassSelect.value] || []);
    });
    resetFocusAfterMouseChoice(charClassSelect);
    resetFocusAfterMouseChoice(subclassSelect);

    // Закраска линии ползунка до бегунка
    function paintRangeTrack() {
        const pct = ((range.value - range.min) / (range.max - range.min)) * 100;
        range.style.setProperty("--fill", pct + "%");
    }

    // Ползунок про готовность играть, число и закраска линии
    range.addEventListener("input", () => {
        rangeOutput.textContent = range.value;
        paintRangeTrack();
    });
    paintRangeTrack(); // стартовая закраска

    // Отправка формы
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const data = Object.fromEntries(new FormData(form));
        const application = new WatchApplication(data);
        application.printToConsole();

        // Статус отправки
        status.hidden = false;
        status.className = "application-form__status application-form__status--ok";
        status.textContent = "Заявка №" + application.id + " принята.";

        form.reset();

        renderSubclasses([]);
        rangeOutput.textContent = range.value;
        paintRangeTrack();
    });
});
