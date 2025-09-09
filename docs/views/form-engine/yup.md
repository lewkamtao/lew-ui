# Yup 语法速查表（表格版）

## 通用类型

| 类型   | 用法                | 示例                                 |
| ------ | ------------------- | ------------------------------------ |
| 对象   | `Yup.object({...})` | `Yup.object({ name: Yup.string() })` |
| 数组   | `Yup.array()`       | `Yup.array().of(Yup.string())`       |
| 字符串 | `Yup.string()`      | `Yup.string().required()`            |
| 数字   | `Yup.number()`      | `Yup.number().min(0)`                |
| 布尔   | `Yup.boolean()`     | `Yup.boolean().required()`           |
| 日期   | `Yup.date()`        | `Yup.date().min(new Date())`         |
| 任意   | `Yup.mixed()`       | `Yup.mixed().nullable()`             |

---

## 常用规则

| 方法                       | 说明        | 示例                                                         |
| -------------------------- | ----------- | ------------------------------------------------------------ |
| `.required(msg)`           | 必填        | `Yup.string().required("必填")`                              |
| `.nullable()`              | 可为 `null` | `Yup.string().nullable()`                                    |
| `.default(value)`          | 默认值      | `Yup.number().default(0)`                                    |
| `.oneOf([values], msg)`    | 允许的值    | `Yup.string().oneOf(["A","B"])`                              |
| `.notOneOf([values], msg)` | 不允许的值  | `Yup.string().notOneOf(["X"])`                               |
| `.when(deps, config)`      | 条件规则    | `Yup.string().when("type", { is:"email", then:s=>s.email() })` |
| `.test(name, msg, fn)`     | 自定义校验  | `Yup.number().test("even","必须是偶数",v=>v%2===0)`          |

---

## 字符串

| 方法                   | 说明      | 示例                               |
| ---------------------- | --------- | ---------------------------------- |
| `.min(len, msg)`       | 最小长度  | `Yup.string().min(3)`              |
| `.max(len, msg)`       | 最大长度  | `Yup.string().max(10)`             |
| `.length(len, msg)`    | 固定长度  | `Yup.string().length(6)`           |
| `.matches(regex, msg)` | 正则匹配  | `Yup.string().matches(/^[0-9]+$/)` |
| `.email(msg)`          | 邮箱格式  | `Yup.string().email()`             |
| `.url(msg)`            | URL 格式  | `Yup.string().url()`               |
| `.uuid(msg)`           | UUID 格式 | `Yup.string().uuid()`              |
| `.trim()`              | 去除空格  | `Yup.string().trim()`              |
| `.lowercase()`         | 转小写    | `Yup.string().lowercase()`         |
| `.uppercase()`         | 转大写    | `Yup.string().uppercase()`         |

---

## 数字

| 方法                    | 说明   | 示例                        |
| ----------------------- | ------ | --------------------------- |
| `.min(value, msg)`      | 最小值 | `Yup.number().min(1)`       |
| `.max(value, msg)`      | 最大值 | `Yup.number().max(100)`     |
| `.lessThan(value, msg)` | 小于   | `Yup.number().lessThan(10)` |
| `.moreThan(value, msg)` | 大于   | `Yup.number().moreThan(0)`  |
| `.positive()`           | 正数   | `Yup.number().positive()`   |
| `.negative()`           | 负数   | `Yup.number().negative()`   |
| `.integer()`            | 整数   | `Yup.number().integer()`    |

---

## 日期

| 方法                  | 说明     | 示例                         |
| --------------------- | -------- | ---------------------------- |
| `.min(date/ref, msg)` | 最小日期 | `Yup.date().min(new Date())` |
| `.max(date/ref, msg)` | 最大日期 | `Yup.date().max(new Date())` |

---

## 数组

| 方法                | 说明     | 示例                           |
| ------------------- | -------- | ------------------------------ |
| `.of(schema)`       | 元素规则 | `Yup.array().of(Yup.string())` |
| `.min(len, msg)`    | 最少元素 | `Yup.array().min(1)`           |
| `.max(len, msg)`    | 最多元素 | `Yup.array().max(5)`           |
| `.length(len, msg)` | 固定长度 | `Yup.array().length(3)`        |
| `.compact(fn?)`     | 过滤元素 | `Yup.array().compact()`        |
| `.unique(fn?)`      | 唯一性   | `Yup.array().unique()`         |

---

## 对象

| 方法                      | 说明         | 示例                                 |
| ------------------------- | ------------ | ------------------------------------ |
| `.shape({ key: schema })` | 定义字段     | `Yup.object({ name: Yup.string() })` |
| `.pick([keys])`           | 选取部分     | `schema.pick(["name"])`              |
| `.omit([keys])`           | 忽略部分     | `schema.omit(["age"])`               |
| `.noUnknown(msg)`         | 禁止未知字段 | `Yup.object().noUnknown()`           |

---

## Mixed (通用)

| 方法                     | 说明         | 示例                                   |
| ------------------------ | ------------ | -------------------------------------- |
| `.defined()`             | 必须有值     | `Yup.mixed().defined()`                |
| `.nullable()`            | 可为 null    | `Yup.mixed().nullable()`               |
| `.notRequired()`         | 可选         | `Yup.mixed().notRequired()`            |
| `.strict()`              | 严格模式     | `Yup.mixed().strict()`                 |
| `.equals([values], msg)` | 值相等       | `Yup.mixed().equals([42])`             |
| `.typeError(msg)`        | 类型错误提示 | `Yup.number().typeError("必须是数字")` |

