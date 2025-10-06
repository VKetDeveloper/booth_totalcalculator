// content.js - Booth散財チェッカー
(() => {
    "use strict";

    // Price Comparison List (降順)
    const PRICE_COMPARISONS = [
        [114381200000000, "日本の国家予算をまかなえていました！"],
        [23760000000000, "イーロン・マスクよりお金持ちでした！"],
        [9000000000000, "映画「シン・ゴジラ」の被害額を一人で賠償できました！"],
        [1652283360000, "Google社の時価総額を超えていました！"],
        [1510160000000, "Discordを買収できていたかもしれません！"],
        [639000000000, "映画「名探偵コナン 紺青の拳」の被害額を一人で賠償できました！"],
        [395000000000, "イージス艦を一隻買えました！"],
        [90804000000, "マインクラフトの金ブロック1個が買えました！"],
        [1250000000, "VRChatの推定時価総額を超えていました！"],
        [1208280000, "GTA5のバイク「オプレッサー MkⅡ」を1台買えました！"],
        [332277000, "GTA5の潜水艦「コサトカ」を1艇買えました！"],
        [143600000, "首都圏の新築マンション1戸が買えました！"],
        [53200000, "USJの夜間貸し切りが出来ました！"],
        [8920000, "新車のベルファイアが買えました！"],
        [7336000, "エンジニアの平均年収を超えていました！"],
        [6116279, "コンビニ1軒の全商品を購入できていました！"],
        [5000000, "クロマグロ1尾が買えました！"],
        [4610000, "サラリーマンの平均年収を超えていました！"],
        [3214800, "東京大学理Ⅲの1年の学費をまかなえていました！"],
        [2750000, "新型プリウスの新車が買えました！"],
        [2361000, "40人規模の結婚式を挙げられました！相手は付属しません"],
        [1548000, "中古車1台が買えました！"],
        [1500000, "ゲーセンのmaimai筐体が買えました！"],
        [1386000, "GeeScorpion(超高級ゲーミングチェア)が買えました！"],
        [1180872, "ペッパーくんが一人買えました！"],
        [1111400, "大学生の1年の生活費をまかなえていました！"],
        [1000000, "ゲーセンの太鼓の達人の新筐体が買えました！"],
        [940000, "ゲーセンにあるポップンミュージックの旧筐体が買えました！"],
        [917540, "鹿児島駅前から札幌駅前までタクシーで移動できました！"],
        [800000, "ゲーセンのダンエボの筐体が買えました！"],
        [770000, "Valorantの全スキンが買えました！"],
        [650000, "ゲーセンのProject Divaの筐体が買えました！"],
        [588450, "超ハイスペックゲーミングパソコンが1台買えました！"],
        [540000, "公園にある4人乗りブランコが買えました！"],
        [493450, "大阪駅前から青森駅までタクシーで移動できました！"],
        [460000, "公園にあるジャングルジムが買えました！"],
        [400000, "Valve Index VRフルキット + ハイスペックゲーミングパソコンが買えました！"],
        [359777, "Nvidia Quadro RTX 5000が買えました！"],
        [319800, "Nvidia RTX 4090が買えました！"],
        [310000, "公園にある2人乗りブランコが買えました！"],
        [280000, "公園にあるうんていが買えました！"],
        [250000, "4泊6日ハワイ旅行ができました！"],
        [219800, "iPhone 15 Pro Max 512GBが買えました！"],
        [198000, "iMacを1台買えました！"],
        [165980, "Valve Index VRフルキットが買えました！"],
        [159800, "iPhone 15 Pro 128GBが買えました！"],
        [150000, "公園にある鉄棒が1欄買えました！"],
        [149000, "キングサイズのベッドが買えました！"],
        [147000, "このツールの作者の貯金額以上でした......"],
        [139800, "iPhone 15 Plusが買えました！"],
        [124800, "iPad Pro 11インチが買えました！"],
        [104000, "東京都の平均家賃1ヶ月分をまかなえました！"],
        [96800, "Meta Quest 3 512GBが買えました！"],
        [82800, "Valve Index HMDが買えました！"],
        [74800, "Meta Quest 3 128GBが買えました！"],
        [53900, "Meta Quest 2 256GBが買えました！"],
        [49000, "PICO 4が買えました！"],
        [47300, "Meta Quest 2 128GBが買えました！"],
        [38410, "一人暮らしの一ヶ月の食費がまかなえました！"],
        [32890, "Yogibo Maxが買えました！"],
        [17490, "ジェラピケのパジャマが買えました！"],
        [9100, "カイジの月給を超えていました！"],
        [7900, "ディズニーランドで1日遊べていました！"],
        [5368, "焼肉食べ放題に行けました！"],
        [4748, "モンエナ355mlが24本買えました！"],
        [3905, "ストゼロ500mlが24本買えました！"],
        [1999, "ダイの大冒険が買えました！"],
        [1500, "VRChat Plusに1ヶ月加入できました！"],
        [1280, "YouTube Premiumに1ヶ月加入できました！"],
        [700, "スタバのフラペチーノが飲めました！"],
        [300, "ファミマのアイスコーヒーLサイズが飲めました！"],
        [220, "ファミチキが1個買えました！"],
        [100, "ボールペンが1本買えました！"],
        [20, "もやしが1袋買えました！"],
        [3, "レジ袋Mサイズ1枚しか買えませんでした......"],
    ];

    // Helper for consistent Yen formatting
    function formatYen(amount) {
        const n = Number(amount) || 0;
        return `${n.toLocaleString()}円`;
    }

    // Styles
    const STYLES = {
        FIXED_BUTTON: {
            color: "#ffffff",
            borderRadius: "20px",
            padding: "10px 15px",
            border: "none",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
            position: "fixed",
            zIndex: "10000",
            fontSize: "13px",
        },
        COLORS: {
            PRIMARY: "#fc4d50",
            PRIMARY_HOVER: "#ff6669",
            AUTO: "#1b7f8c",
            AUTO_HOVER: "#22a1b2",
            AUTO_STOP: "#f30f4c",
            AUTO_STOP_HOVER: "#c00b3c",
            RESET: "#0077B5",
            RESET_HOVER: "#005588",
            TWEET: "#1DA1F2",
            TWEET_HOVER: "#1A91DA",
        },
    };

    // Storage helpers (space-separated ids)
    function getExcludeStore() {
        const raw = localStorage.getItem("exclude_item_ids");
        if (!raw) return new Set();
        return new Set(raw.trim().split(/\s+/).filter(Boolean));
    }
    function setExcludeStore(setOrArray) {
        let arr = [];
        if (setOrArray instanceof Set) arr = Array.from(setOrArray);
        else if (Array.isArray(setOrArray)) arr = setOrArray;
        else if (typeof setOrArray === "string")
            arr = setOrArray.trim().split(/\s+/).filter(Boolean);
        localStorage.setItem("exclude_item_ids", arr.join(" "));
    }
    function addToExclude(itemId) {
        const s = getExcludeStore();
        s.add(itemId);
        setExcludeStore(s);
    }
    function removeFromExclude(itemId) {
        const s = getExcludeStore();
        s.delete(itemId);
        setExcludeStore(s);
    }
    function isExcluded(itemId) {
        return getExcludeStore().has(String(itemId));
    }

    // URL Parameter Management
    class URLManager {
        constructor() {
            this.url = new URL(window.location.href);
            this.initializeParams();
        }

        initializeParams() {
            // Ensure some parameters exist (but avoid infinite reloads).
            const params = [
                ["total", "0"],
                ["gift_total", "0"],
                ["auto", this.url.searchParams.get("auto") === "1" ? "1" : "0"],
                ["page", this.url.searchParams.get("page") || "1"],
            ];

            let changed = false;
            params.forEach(([key, defaultValue]) => {
                if (this.url.searchParams.get(key) === null) {
                    this.url.searchParams.set(key, defaultValue);
                    changed = true;
                }
            });

            if (changed) {
                // replaceState so we don't re-load unnecessarily — but original script relied on reload.
                // For compatibility we'll replace URL without reloading.
                const newHref = this.url.pathname + "?" + this.url.searchParams.toString();
                history.replaceState(null, "", newHref);
            }
        }

        static processNextPage(currentHref) {
            const parsedURL = new URL(currentHref);
            const currentPage = parseInt(parsedURL.searchParams.get("page") || "1", 10);
            parsedURL.searchParams.set("page", (currentPage + 1).toString());
            window.location.href = parsedURL.href;
        }

        static resetToFirstPage() {
            const parsedURL = new URL(window.location.href);
            parsedURL.searchParams.set("page", "1");
            parsedURL.searchParams.set("auto", "0");
            parsedURL.searchParams.set("total", "0");
            parsedURL.searchParams.set("gift_total", "0");
            window.location.href = parsedURL.href;
        }
    }

    // Exclusion manager
    class ExclusionManager {
        static setupExclusionButtons() {
            const container = document.getElementsByClassName("l-orders-index")[0];
            if (!container) return;
            const itemElements = Array.from(container.children);

            itemElements.forEach((item, index) => {
                // skip pager or non-order rows
                if (!item || item.classList.contains("pager")) return;

                // avoid duplicate buttons
                if (item.querySelector && item.querySelector(".booth-exclude-button")) return;

                const button = this.createExcludeButton(item, index);
                // Prefer appending to a header-like element, otherwise to item
                const target =
                    item.querySelector && item.querySelector(".u-tpg-caption1")
                        ? item.querySelector(".u-tpg-caption1")
                        : item.firstElementChild || item;
                try {
                    target.appendChild(button);
                } catch (e) {
                    item.appendChild(button);
                }
            });

            this.setupKeyboardShortcuts();
        }

        static createExcludeButton(item, index) {
            const button = document.createElement("button");
            button.className = `booth-exclude-button`;
            button.dataset.idx = index;

            const href =
                (item && (item.href || (item.querySelector && ((item.querySelector("a") && item.querySelector("a").href) || "")))) || "";
            const match = href.match(/\d+$/);
            const itemId = match ? match[0] : `unknown-${index}`;
            const excluded = isExcluded(itemId);

            button.textContent = excluded ? "除外解除" : "除外する";
            button.classList.add(excluded ? "ex_true" : "ex_false");
            Object.assign(button.style, {
                marginLeft: "8px",
                color: "#ffffff",
                border: "none",
                fontSize: "11px",
                padding: "6px",
                background: excluded ? "#e1362e" : "#808080",
                borderRadius: "8px",
                cursor: "pointer",
            });

            button.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();
                this.handleExcludeClick(event, index, item);
            });

            return button;
        }

        static setupKeyboardShortcuts() {
            const keysPressed = new Set();

            document.addEventListener("keydown", (ev) => {
                keysPressed.add(ev.key.toLowerCase());

                // shift + e + l -> reset exclude list
                if (keysPressed.has("shift") && keysPressed.has("e") && keysPressed.has("l")) {
                    if (confirm("除外設定を全てリセットしますか？")) {
                        setExcludeStore([]);
                        window.location.reload();
                    }
                    keysPressed.clear();
                }
            });

            document.addEventListener("keyup", (ev) => {
                keysPressed.delete(ev.key.toLowerCase());
            });
        }

        static handleExcludeClick(event, index, item) {
            const button = event.currentTarget;
            const href =
                (item && (item.href || (item.querySelector && ((item.querySelector("a") && item.querySelector("a").href) || "")))) || "";
            const match = href.match(/\d+$/);
            const itemId = match ? match[0] : `unknown-${index}`;

            if (event.ctrlKey || event.metaKey) {
                // Toggle all: set all to opposite of current unifiedState
                this.toggleAllExclusions();
            } else {
                this.toggleSingleExclusion(button, itemId);
            }
        }

        static unifiedState = false; // false => currently not-all-excluded

        static toggleAllExclusions() {
            const allButtons = document.querySelectorAll(".booth-exclude-button");
            const newState = !this.unifiedState;
            this.unifiedState = newState;

            const store = getExcludeStore();
            allButtons.forEach((button) => {
                const parentItem = button.closest(".l-orders-index > *") || button.parentElement;
                const href =
                    (parentItem && ((parentItem.href) || (parentItem.querySelector && (parentItem.querySelector("a") && parentItem.querySelector("a").href)))) || "";
                const match = href.match(/\d+$/);
                const itemId = match ? match[0] : null;

                if (newState) {
                    // mark excluded
                    button.style.background = "#e1362e";
                    button.textContent = "除外解除";
                    button.classList.remove("ex_false");
                    button.classList.add("ex_true");
                    if (itemId) store.add(itemId);
                } else {
                    // mark included
                    button.style.background = "#808080";
                    button.textContent = "除外する";
                    button.classList.remove("ex_true");
                    button.classList.add("ex_false");
                    if (itemId) store.delete(itemId);
                }
            });
            setExcludeStore(store);
        }

        static toggleSingleExclusion(button, itemId) {
            // If currently excluded (class ex_true), we remove exclusion; else add exclusion.
            const currentlyExcluded = button.classList.contains("ex_true");
            if (currentlyExcluded) {
                // remove
                button.style.background = "#808080";
                button.textContent = "除外する";
                button.classList.remove("ex_true");
                button.classList.add("ex_false");
                removeFromExclude(itemId);
            } else {
                // add
                button.style.background = "#e1362e";
                button.textContent = "除外解除";
                button.classList.remove("ex_false");
                button.classList.add("ex_true");
                addToExclude(itemId);
            }
        }
    }

    // Item Manager
    class ItemManager {
        static collectItemInfo(itemElement) {
            if (!itemElement) return null;

            // attempt to find anchor with order URL
            let anchor = null;
            if (itemElement.tagName === "A" && itemElement.href) anchor = itemElement;
            else {
                anchor = itemElement.querySelector && (itemElement.querySelector("a[href*='/orders/']") || itemElement.querySelector("a"));
            }
            const href = anchor && anchor.href ? anchor.href : "";
            const match = href.match(/orders\/(\d+)/) || href.match(/(\d+)$/);
            if (!match) {
                // if no numeric id found, skip this item
                return null;
            }
            const itemId = match[1] || match[0];

            if (isExcluded(itemId)) {
                return "exclude";
            }

            // Try to extract variation text from caption if present
            let itemVariation = null;
            try {
                const caption = itemElement.getElementsByClassName && itemElement.getElementsByClassName("u-tpg-caption1") && itemElement.getElementsByClassName("u-tpg-caption1")[0];
                if (caption && caption.innerText) {
                    const m = caption.innerText.match(/\(([^)]+)\)[^\(]*$/);
                    if (m && m[1]) itemVariation = m[1].trim();
                }
            } catch (e) {
                itemVariation = null;
            }

            const orderId = Number(itemId);

            return {
                item_id: String(itemId),
                item_variation: itemVariation,
                order_id: orderId,
            };
        }

        static async fetchItemPrice(orderId) {
            // returns { item_price: number|undefined, is_gift: boolean } or throws
            try {
                const url = `https://accounts.booth.pm/orders/${orderId}`;
                const response = await fetch(url, {
                    credentials: "include",
                    headers: { Accept: "text/html" },
                });

                if (response.status === 404) {
                    return { item_price: undefined, is_gift: false, note: "Item deleted or private (404)" };
                }

                const text = await response.text();

                // search for "購入額" followed by yen amount (robust to spaces and commas)
                const matched = text.match(/購入額[\s\S]{0,80}?¥\s*([\d,]+)/) || text.match(/¥\s*([\d,]+)\s*<\/span>/);
                const isGift = text.includes('<b class="u-tpg-title3">ギフト</b>') || /ギフト/.test(text);

                if (matched && matched[1]) {
                    const price = Number(matched[1].replace(/,/g, ""));
                    return { item_price: price, is_gift: Boolean(isGift) };
                } else {
                    // Could not parse price
                    return { item_price: undefined, is_gift: Boolean(isGift), note: "price not found" };
                }
            } catch (error) {
                throw new Error(`Request error: ${error.message}`);
            }
        }
    }

    // Price comparator
    class PriceComparator {
        static typicalPrice(totalPrice) {
            const numericPrice = Number(totalPrice) || 0;
            for (const [threshold, message] of PRICE_COMPARISONS) {
                if (numericPrice >= threshold) return message;
            }
            return "何も買えませんでした。";
        }
    }

    // UI components
    class UIComponents {
        static createButton(text, options) {
            const button = document.createElement("button");
            button.innerText = text;
            // apply base fixed style
            Object.assign(button.style, STYLES.FIXED_BUTTON);
            // apply custom style overrides
            if (options.style) Object.assign(button.style, options.style);

            // ensure initial background is set to baseColor
            if (options.baseColor) button.style.background = options.baseColor;

            if (options.hoverColor) {
                button.addEventListener("mouseover", () => (button.style.background = options.hoverColor));
                button.addEventListener("mouseout", () => (button.style.background = options.baseColor));
            }

            if (typeof options.onClick === "function") button.addEventListener("click", options.onClick);
            document.body.appendChild(button);
            return button;
        }

        static calculateButton = null;

        static addCalculateButton() {
            // If exists, return existing
            if (this.calculateButton) return this.calculateButton;

            this.calculateButton = this.createButton("ページ計算", {
                style: {
                    bottom: "10px",
                    left: "10px",
                },
                baseColor: STYLES.COLORS.PRIMARY,
                hoverColor: STYLES.COLORS.PRIMARY_HOVER,
                onClick: () => main(),
            });
            this.calculateButton.classList.add("booth-total-price-button");
            return this.calculateButton;
        }

        static addAutoButton(autoCalculate) {
            const label = autoCalculate ? "自動計算停止" : "全ページ計算";
            return this.createButton(label, {
                style: {
                    bottom: "10px",
                    left: "140px",
                },
                baseColor: autoCalculate ? STYLES.COLORS.AUTO_STOP : STYLES.COLORS.AUTO,
                hoverColor: autoCalculate ? STYLES.COLORS.AUTO_STOP_HOVER : STYLES.COLORS.AUTO_HOVER,
                onClick: () => {
                    if (autoCalculate) {
                        this.stopAuto();
                    } else {
                        this.startAuto();
                    }
                },
            });
        }

        static addResetButton() {
            return this.createButton("累計金額をリセット", {
                style: {
                    bottom: "10px",
                    left: "280px",
                },
                baseColor: STYLES.COLORS.RESET,
                hoverColor: STYLES.COLORS.RESET_HOVER,
                onClick: () => this.resetTotal(),
            });
        }

        static addTweetButton(totalPrice, giftTotal) {
            // totalPrice and giftTotal may be strings; convert to number for comparator
            const totalNum = Number(totalPrice) || 0;
            const giftNum = Number(giftTotal) || 0;

            return this.createButton("Twitterに共有", {
                style: {
                    bottom: "60px",
                    left: "280px",
                },
                baseColor: STYLES.COLORS.TWEET,
                hoverColor: STYLES.COLORS.TWEET_HOVER,
                onClick: () => this.handleTweet(totalNum, giftNum),
            });
        }

        static addTotalPriceDisplay(totalPrice, giftTotal) {
            // remove any existing display(s) to avoid duplication
            const existing = document.querySelectorAll(".booth-total-display");
            existing.forEach((el) => el.remove());

            const display = document.createElement("div");
            display.classList.add("booth-total-display");
            Object.assign(display.style, {
                position: "fixed",
                bottom: "60px",
                left: "10px",
                backgroundColor: "#333",
                color: "#fff",
                padding: "6px 18px",
                borderRadius: "20px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                border: "none",
                zIndex: "10000",
                cursor: "pointer",
                fontSize: "13px",
            });

            const totalNum = Number(totalPrice) || 0;
            display.textContent = `合計金額: ${formatYen(totalNum)}`;
            if (giftTotal !== undefined) {
                const giftNum = Number(giftTotal) || 0;
                display.title = `内ギフト合計: ${formatYen(giftNum)}`;
                display.dataset.gift = String(giftNum);
            }

            display.addEventListener("mouseover", () => (display.style.background = "#444"));
            display.addEventListener("mouseout", () => (display.style.background = "#333"));
            display.onclick = () => {
                const giftNum = Number(display.dataset.gift) || 0;
                alert(`合計金額の内、ギフト合計は ${formatYen(giftNum)} です`);
            };

            document.body.appendChild(display);
            return display;
        }

        static handleTweet(totalPrice, giftTotal) {
            const comparison = PriceComparator.typicalPrice(totalPrice);
            const includeComparison = confirm(
                `以下のメッセージを含めますか？\n\nもし${formatYen(totalPrice)}あれば...\n『${comparison}』\n\nOKを押すと、この文章を入れてツイートします。`
            );

            let tweetText = `私がBoothで使用した合計金額は、『${formatYen(totalPrice)}』でした！`;
            if (giftTotal > 0) {
                tweetText += `（内ギフト合計: ${formatYen(giftTotal)}）`;
            }
            if (includeComparison) {
                tweetText += `\n\nもし${formatYen(totalPrice)}あれば...\n『${comparison}』`;
            }

            tweetText += `\n\n#Booth購入金額`;

            const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
            window.open(tweetURL, "_blank");
        }

        static startAuto() {
            const url = new URL(window.location.href);
            url.searchParams.set("auto", "1");
            url.searchParams.set("page", "1");
            url.searchParams.set("total", url.searchParams.get("total") || "0");
            url.searchParams.set("gift_total", url.searchParams.get("gift_total") || "0");
            window.location.href = url.href;
        }

        static stopAuto() {
            const url = new URL(window.location.href);
            url.searchParams.set("auto", "0");
            window.location.href = url.href;
        }

        static resetTotal() {
            const url = new URL(window.location.href);
            url.searchParams.set("total", "0");
            url.searchParams.set("gift_total", "0");
            url.searchParams.set("auto", "0");

            if (confirm("累計金額をリセットしますか？")) {
                window.location.href = url.href;
            }
        }
    }

    // Progress display
    class ProgressDisplay {
        constructor() {
            this.element = document.createElement("div");
            Object.assign(this.element.style, {
                position: "fixed",
                bottom: "100px",
                left: "10px",
                color: "#fc4d50",
                zIndex: "10000",
                background: "rgba(255,255,255,0.9)",
                padding: "6px 10px",
                borderRadius: "10px",
                fontSize: "12px",
            });
            document.body.appendChild(this.element);
        }

        update(completed, total) {
            this.element.textContent = `進行中: ${completed}/${total}`;
        }

        clear() {
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
        }
    }

    // Main calculation logic
    async function main() {
        const url = new URL(window.location.href);
        const button = UIComponents.calculateButton;
        if (button) {
            button.disabled = true;
            button.style.cursor = "wait";
            button.style.opacity = "0.7";
        }

        const container = document.getElementsByClassName("l-orders-index")[0];
        if (!container) {
            alert("注文リストが見つかりませんでした。ページ構造を確認してください。");
            if (button) {
                button.disabled = false;
                button.style.cursor = "pointer";
                button.style.opacity = "1";
            }
            return { totalPrice: 0, giftTotal: 0 };
        }
        const itemListElements = Array.from(container.children).filter((el) => !el.classList.contains("pager"));
        if (itemListElements.length === 0) {
            alert("計算が終了しました");
            URLManager.resetToFirstPage();
            return { totalPrice: 0, giftTotal: 0 };
        }

        let itemList = itemListElements.map(ItemManager.collectItemInfo).filter((x) => x !== null);
        console.log("Collected item list:", itemList);

        if (itemList.length === 0 || itemList.every((v) => v === "exclude")) {
            // nothing to process on this page
            const autoCalculate = url.searchParams.get("auto") === "1";
            if (autoCalculate) {
                URLManager.processNextPage(window.location.href);
                return { totalPrice: 0, giftTotal: 0 };
            } else {
                alert("計算が終了しました");
                URLManager.resetToFirstPage();
                return { totalPrice: 0, giftTotal: 0 };
            }
        }

        itemList = itemList.filter((element) => element !== "exclude");
        console.log("Filtered item list:", itemList);

        const priceList = [];
        let giftTotalArr = [];
        const progress = new ProgressDisplay();
        const totalItems = itemList.length;
        let completedItems = 0;

        progress.update(completedItems, totalItems);

        for (const itemInfo of itemList) {
            try {
                const itemPriceObj = await ItemManager.fetchItemPrice(itemInfo.order_id);
                console.log("Fetched price:", itemPriceObj);
                if (itemPriceObj && typeof itemPriceObj.item_price === "number") {
                    priceList.push(itemPriceObj.item_price);
                    if (itemPriceObj.is_gift) {
                        giftTotalArr.push(itemPriceObj.item_price);
                    }
                } else {
                    // price not found or undefined: log note
                    console.warn(`Could not find price for order ${itemInfo.order_id}`, itemPriceObj && itemPriceObj.note);
                }
            } catch (error) {
                console.error("Error fetching item price for", itemInfo.order_id, error);
            }
            completedItems++;
            progress.update(completedItems, totalItems);
            // small delay to be gentle to server
            await new Promise((resolve) => setTimeout(resolve, 150));
        }

        const pageTotalPrice = priceList.reduce((a, b) => a + b, 0);
        const pageGiftTotalPrice = giftTotalArr.reduce((a, b) => a + b, 0);
        console.log("Page total price:", pageTotalPrice, "Page gift total:", pageGiftTotalPrice);

        const existingTotal = Number(url.searchParams.get("total")) || 0;
        const existingGiftTotal = Number(url.searchParams.get("gift_total")) || 0;
        const newTotal = existingTotal + pageTotalPrice;
        const newGiftTotal = existingGiftTotal + pageGiftTotalPrice;

        // set updated totals in URL (so across pages it's preserved)
        url.searchParams.set("total", String(newTotal));
        url.searchParams.set("gift_total", String(newGiftTotal));

        // update UI
        UIComponents.addTotalPriceDisplay(newTotal, newGiftTotal);

        const autoCalculate = url.searchParams.get("auto") === "1";

        progress.clear();
        if (!autoCalculate) {
            alert(`このページの合計金額: ${formatYen(pageTotalPrice)}\n今までの合計金額: ${formatYen(newTotal)}`);
            // ensure URL shown to user includes updated totals without navigating (replace state)
            const newHref = url.pathname + "?" + url.searchParams.toString();
            history.replaceState(null, "", newHref);
            if (button) {
                button.disabled = false;
                button.style.cursor = "pointer";
                button.style.opacity = "1";
                button.textContent = "計算済み";
            }
            return { totalPrice: newTotal, giftTotal: newGiftTotal };
        } else {
            // auto: navigate to next page with updated params
            window.location.href = url.href;
            // never reach here because page will reload, but return for completeness
            return { totalPrice: newTotal, giftTotal: newGiftTotal };
        }
    }

    // initialize
    const urlManager = new URLManager();
    const autoCalculate = urlManager.url.searchParams.get("auto") === "1";
    const totalPriceParam = urlManager.url.searchParams.get("total") || "0";
    const totalGiftPriceParam = urlManager.url.searchParams.get("gift_total") || "0";

    try {
        ExclusionManager.setupExclusionButtons();
    } catch (e) {
        console.warn("Exclusion setup failed:", e);
    }

    // Create UI buttons / displays
    UIComponents.addCalculateButton();
    UIComponents.addAutoButton(autoCalculate);
    UIComponents.addResetButton();
    UIComponents.addTweetButton(totalPriceParam, totalGiftPriceParam);
    UIComponents.addTotalPriceDisplay(totalPriceParam, totalGiftPriceParam);

    // If auto mode is set, start calculation immediately
    if (autoCalculate) {
        (async () => {
            try {
                await main();
                // after main (which will navigate on auto), we still add controls for safety
                UIComponents.addTweetButton(urlManager.url.searchParams.get("total") || "0", urlManager.url.searchParams.get("gift_total") || "0");
                UIComponents.addTotalPriceDisplay(urlManager.url.searchParams.get("total") || "0", urlManager.url.searchParams.get("gift_total") || "0");
            } catch (e) {
                console.error("Auto calculation error:", e);
            }
        })();
    }
})();
