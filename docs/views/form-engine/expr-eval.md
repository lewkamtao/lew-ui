# expr-eval 完整字符串表达式速查表

| 分类 | 语法 / 符号 | 说明 | 示例 |
|------|-------------|------|------|
| 算术运算 | `+` | 加 | `a + b` |
|  | `-` | 减 | `a - b` |
|  | `*` | 乘 | `a * b` |
|  | `/` | 除 | `a / b` |
|  | `%` | 取余 | `a % b` |
|  | `^` | 幂运算 | `a ^ 2` |
| 比较运算 | `==` | 等于 | `status == "active"` |
|  | `!=` | 不等于 | `status != "inactive"` |
|  | `>` | 大于 | `age > 18` |
|  | `<` | 小于 | `score < 60` |
|  | `>=` | 大于等于 | `age >= 18` |
|  | `<=` | 小于等于 | `score <= 100` |
| 逻辑运算 | `&&` | 逻辑与 | `age >= 18 && status == "active"` |
|  | `||` | 逻辑或 | `role == "admin" || role == "manager"` |
|  | `!` | 逻辑非 | `!isDeleted` |
| 三元运算 | `condition ? value1 : value2` | 条件表达式 | `score > 60 ? "pass" : "fail"` |
| 括号 | `()` | 控制运算优先级 | `(a + b) * c` |
| 字符串操作 | `"abc"` | 字符串字面量 | `"hello" + " " + "world"` |
| 数组操作 | `[1,2,3]` | 数组字面量 | `[a, b, c]` |
|  | `x in [1,2,3]` | 包含检查 | `age in [18, 20, 22]` |
|  | `x not in [1,2,3]` | 不包含检查 | `role not in ["guest", "visitor"]` |
| 内置数学函数 | `abs(x)` | 绝对值 | `abs(-5)` → `5` |
|  | `sqrt(x)` | 平方根 | `sqrt(9)` → `3` |
|  | `log(x)` | 自然对数 | `log(10)` |
|  | `exp(x)` | e 的 x 次方 | `exp(1)` |
|  | `pow(x, y)` | x 的 y 次方 | `pow(2,3)` → `8` |
|  | `min(a, b, ...)` | 最小值 | `min(5,10,3)` → `3` |
|  | `max(a, b, ...)` | 最大值 | `max(5,10,3)` → `10` |
|  | `round(x)` | 四舍五入 | `round(3.6)` → `4` |
|  | `floor(x)` | 向下取整 | `floor(3.8)` → `3` |
|  | `ceil(x)` | 向上取整 | `ceil(3.2)` → `4` |
|  | `trunc(x)` | 去除小数部分 | `trunc(3.8)` → `3` |
| 条件函数 | `if(condition, value1, value2)` | 条件返回值 | `if(score>60,"pass","fail")` |
| 字符串函数 | `length(s)` | 字符串长度 | `length("hello")` → `5` |
|  | `upper(s)` | 转大写 | `upper("abc")` → `"ABC"` |
|  | `lower(s)` | 转小写 | `lower("ABC")` → `"abc"` |
|  | `substring(s, start, end)` | 截取子串 | `substring("hello",1,4)` → `"ell"` |
| 其他函数 | `round(x, n)` | 四舍五入保留 n 位 | `round(3.1415,2)` → `3.14` |
|  | `sign(x)` | 符号函数 | `sign(-5)` → `-1` |
|  | `random()` | 生成 0~1 随机数 | `random()` → `0.374` |
