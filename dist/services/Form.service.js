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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormService = void 0;
const prismaClient_1 = __importDefault(require("../lib/prismaClient"));
const formIncludes = {
    author: {
        select: {
            id: true,
            name: true,
        },
    },
    questions: {
        include: {
            options: {
                select: {
                    id: true,
                    text: true,
                    answer: true,
                    order: true,
                },
            },
        },
    },
};
exports.FormService = {
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, questions } = input;
            return yield prismaClient_1.default.form.create({
                data: {
                    author: {
                        connect: { id: input.authorId },
                    },
                    name,
                    description,
                    questions: {
                        create: questions.map(question => {
                            return {
                                label: question.label,
                                type: {
                                    connect: { id: question.questionTypeId },
                                },
                                order: question.order,
                                options: {
                                    create: question.options.map((option, index) => {
                                        return {
                                            value: option.value,
                                            order: index,
                                        };
                                    }),
                                },
                            };
                        }),
                    },
                },
            });
        });
    },
    findMany(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prismaClient_1.default.form.findMany(Object.assign(Object.assign({}, input), { include: Object.assign({}, formIncludes) }));
        });
    },
    findUnique(input) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('input', input);
            return yield prismaClient_1.default.form.findUnique({
                where: {
                    id: input.id,
                },
                include: Object.assign({}, formIncludes),
            });
        });
    },
    update(_a) {
        var _b, _c, _d;
        var { id } = _a, _e = _a.data, { questions } = _e, formData = __rest(_e, ["questions"]);
        return __awaiter(this, void 0, void 0, function* () {
            console.log('formData', (_b = questions.update[0].options) === null || _b === void 0 ? void 0 : _b.delete[0]);
            return yield prismaClient_1.default.form.update({
                where: {
                    id,
                },
                data: Object.assign(Object.assign({}, formData), { questions: {
                        update: (_c = questions === null || questions === void 0 ? void 0 : questions.update) === null || _c === void 0 ? void 0 : _c.map(question => {
                            var _a, _b, _c;
                            const { id, options } = question, questionData = __rest(question, ["id", "options"]);
                            return {
                                where: {
                                    id: id,
                                },
                                data: Object.assign(Object.assign({}, questionData), { options: {
                                        update: (_a = options === null || options === void 0 ? void 0 : options.update) === null || _a === void 0 ? void 0 : _a.map(option => {
                                            const { id } = option, optionData = __rest(option, ["id"]);
                                            return {
                                                where: {
                                                    id: id,
                                                },
                                                data: Object.assign({}, optionData),
                                            };
                                        }),
                                        create: (_b = options === null || options === void 0 ? void 0 : options.create) === null || _b === void 0 ? void 0 : _b.map((option) => {
                                            return {
                                                value: option.value,
                                                order: option.order,
                                            };
                                        }),
                                        deleteMany: {
                                            id: {
                                                in: (_c = options === null || options === void 0 ? void 0 : options.delete) === null || _c === void 0 ? void 0 : _c.map(option => {
                                                    console.log(option);
                                                    return option.id;
                                                }),
                                            },
                                        },
                                    } }),
                            };
                        }),
                        create: (_d = questions === null || questions === void 0 ? void 0 : questions.create) === null || _d === void 0 ? void 0 : _d.map(question => {
                            return {
                                label: question.label,
                                order: question.order,
                                type: {
                                    connect: { id: question.questionTypeId },
                                },
                                options: {
                                    create: question.options.map((option) => {
                                        return {
                                            value: option.value,
                                            order: option.order,
                                        };
                                    }),
                                },
                            };
                        }),
                    } }),
                include: {
                    questions: {
                        include: { options: true },
                    },
                },
            });
        });
    },
    delete({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            prismaClient_1.default.form.update({
                where: {
                    id,
                },
                data: {
                    questions: {
                        deleteMany: {
                            id: {},
                        },
                    },
                },
            });
            yield prismaClient_1.default.form.delete({
                where: {
                    id,
                },
            });
        });
    },
    totalItems() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prismaClient_1.default.form.count();
        });
    },
};
//# sourceMappingURL=Form.service.js.map