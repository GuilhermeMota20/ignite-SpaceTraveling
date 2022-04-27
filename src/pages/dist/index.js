"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.getStaticProps = void 0;
var link_1 = require("next/link");
var fi_1 = require("react-icons/fi");
var react_1 = require("react");
var date_fns_1 = require("date-fns");
var locale_1 = require("date-fns/locale");
var Prismic = require("@prismicio/client");
var Header_1 = require("../components/Header");
var prismic_1 = require("../services/prismic");
var common_module_scss_1 = require("../styles/common.module.scss");
var home_module_scss_1 = require("./home.module.scss");
var head_1 = require("next/head");
function Home(_a) {
    var postsPagination = _a.postsPagination;
    var formattedPost = postsPagination.results.map(function (post) {
        return __assign(__assign({}, post), { first_publication_date: date_fns_1.format(new Date(post.first_publication_date), 'dd MMM yyyy', {
                locale: locale_1.ptBR
            }) });
    });
    var _b = react_1.useState(formattedPost), posts = _b[0], setPosts = _b[1]; // usando a formatação como estado inicial dos posts
    // carregar mais páginas
    var _c = react_1.useState(postsPagination.next_page), nextPage = _c[0], setNextPage = _c[1];
    var _d = react_1.useState(1), currentPage = _d[0], setCurrentPage = _d[1];
    function handleNextPage() {
        return __awaiter(this, void 0, Promise, function () {
            var postResults, newPosts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (currentPage !== 1 && nextPage === null) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, fetch("" + nextPage).then(function (response) {
                                return response.json();
                            })];
                    case 1:
                        postResults = _a.sent();
                        setNextPage(postResults.next_page);
                        setCurrentPage(postResults.page);
                        newPosts = postResults.results.map(function (post) {
                            return {
                                uid: post.uid,
                                first_publication_date: date_fns_1.format(new Date(post.first_publication_date), 'dd MMM yyyy', {
                                    locale: locale_1.ptBR
                                }),
                                data: {
                                    title: post.data.title,
                                    subtitle: post.data.subtitle,
                                    author: post.data.author
                                }
                            };
                        });
                        setPosts(__spreadArrays(posts, newPosts));
                        return [2 /*return*/];
                }
            });
        });
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(head_1["default"], null,
            React.createElement("title", null, "Home | SpaceTraveling")),
        React.createElement("main", { className: common_module_scss_1["default"].container },
            React.createElement(Header_1["default"], null),
            React.createElement("div", { className: home_module_scss_1["default"].posts },
                posts.map(function (post) { return (React.createElement(link_1["default"], { href: "/post/" + post.uid, key: post.uid },
                    React.createElement("a", { className: home_module_scss_1["default"].post },
                        React.createElement("strong", null, post.data.title),
                        React.createElement("p", null, post.data.subtitle),
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement(fi_1.FiCalendar, null),
                                post.first_publication_date),
                            React.createElement("li", null,
                                React.createElement(fi_1.FiUser, null),
                                post.data.author))))); }),
                nextPage && ( //visivel apenas se tiver um nextPage;
                React.createElement("button", { type: 'button', onClick: handleNextPage }, "Carregar mais posts"))))));
}
exports["default"] = Home;
exports.getStaticProps = function () { return __awaiter(void 0, void 0, void 0, function () {
    var prismic, postsResponse, posts, postsPagination;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prismic = prismic_1.getPrismicClient({});
                return [4 /*yield*/, prismic.query([Prismic.predicate.at('document.type', 'posts')], {
                        pageSize: 1
                    })
                    // const postsResponse = await prismic.get({
                    //   predicates: Prismic.predicate.at('document.type', 'posts'),
                    //   pageSize: 1,
                    // });
                ];
            case 1:
                postsResponse = _a.sent();
                posts = postsResponse.results.map(function (post) {
                    return {
                        uid: post.uid,
                        first_publication_date: post.first_publication_date,
                        data: {
                            title: post.data.title,
                            subtitle: post.data.subtitle,
                            author: post.data.author
                        }
                    };
                });
                postsPagination = {
                    next_page: postsResponse.next_page,
                    results: posts
                };
                return [2 /*return*/, {
                        props: {
                            postsPagination: postsPagination
                        }
                    }];
        }
    });
}); };
