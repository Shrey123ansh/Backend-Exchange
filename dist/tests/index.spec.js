"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
const supertest_1 = __importDefault(require("supertest"));
describe("Basic tests", () => {
    it("verify initial balances", () => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield (0, supertest_1.default)(__1.app).get("/balance/1").send();
        expect(res.body.balances[__1.TICKER]).toBe(10);
        res = yield (0, supertest_1.default)(__1.app).get("/balance/2").send();
        expect(res.body.balances[__1.TICKER]).toBe(10);
    }));
    it("Can create tests", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(__1.app).post("/order").send({
            type: "limit",
            side: "bid",
            price: 1400.1,
            quantity: 1,
            userId: "1"
        });
        yield (0, supertest_1.default)(__1.app).post("/order").send({
            type: "limit",
            side: "ask",
            price: 1400.9,
            quantity: 10,
            userId: "2"
        });
        yield (0, supertest_1.default)(__1.app).post("/order").send({
            type: "limit",
            side: "ask",
            price: 1501,
            quantity: 5,
            userId: "2"
        });
        let res = yield (0, supertest_1.default)(__1.app).get("/depth").send();
        expect(res.status).toBe(200);
        expect(res.body.depth["1501"].quantity).toBe(5);
    }));
    it("ensures balances are still the same", () => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield (0, supertest_1.default)(__1.app).get("/balance/1").send();
        expect(res.body.balances[__1.TICKER]).toBe(10);
    }));
    it("Places an order that fills", () => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield (0, supertest_1.default)(__1.app).post("/order").send({
            type: "limit",
            side: "bid",
            price: 1502,
            quantity: 2,
            userId: "1"
        });
        expect(res.body.filledQuantity).toBe(2);
    }));
    it("Ensures orderbook updates", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        let res = yield (0, supertest_1.default)(__1.app).get("/depth").send();
        expect((_a = res.body.depth["1400.9"]) === null || _a === void 0 ? void 0 : _a.quantity).toBe(8);
    }));
    it("Ensures balances update", () => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield (0, supertest_1.default)(__1.app).get("/balance/1").send();
        expect(res.body.balances[__1.TICKER]).toBe(12);
        expect(res.body.balances["USD"]).toBe(50000 - 2 * 1400.9);
        res = yield (0, supertest_1.default)(__1.app).get("/balance/2").send();
        expect(res.body.balances[__1.TICKER]).toBe(8);
        expect(res.body.balances["USD"]).toBe(50000 + 2 * 1400.9);
    }));
});
