---
title: 中国剩余定理（CRT）
tags:
  - 数论
  - 中国剩余定理
  - CRT
  - 编程
  - 算法
  - 数学
category: OI知识
top_img: https://haowallpaper.com/link/common/file/previewFileImg/16615269514268032
published: 2025-07-11 08:00:00
---

中国剩余定理（Chinese Remainder Theorem，简称 CRT）是数论中一个重要的定理，常用于解决多模线性同余方程组。它不仅在数学理论上有深远意义，也在算法竞赛和工程实践中被广泛应用。

---

## 1. 什么是中国剩余定理？

假设有一组互质的模数 $m_1, m_2, \ldots, m_k$ ，对应的余数为 $a_1, a_2, \ldots, a_k$ ，求解整数 $x$ 满足：

$$
\begin{cases}
x \equiv a_1 \pmod{m_1} \\
x \equiv a_2 \pmod{m_2} \\
\quad \vdots \\
x \equiv a_k \pmod{m_k}
\end{cases}
$$

中国剩余定理告诉我们，这个方程组存在唯一的解模 $M = m_1 \times m_2 \times \cdots \times m_k$，即 $x$ 在模 $M$ 意义下唯一。

---

## 2. 定理图解

https://www.geogebra.org/m/esztrerw

## 3. 证明

### (1). 问题描述

设有一组模数互素的线性同余方程：

$$
\begin{cases}
x \equiv a_1 \pmod{m_1} \\
x \equiv a_2 \pmod{m_2} \\
\ \vdots \\
x \equiv a_k \pmod{m_k}
\end{cases}
$$

其中：

- $m_1, m_2, \dots, m_k$ 两两互素，即 $\gcd(m_i, m_j) = 1$（当 $i \ne j$）
- $a_1, a_2, \dots, a_k$ 是给定的余数

目标是：构造出一个整数 $x$，使得其同时满足上述同余式，并且在模 $M = m_1 m_2 \cdots m_k$ 的意义下是唯一解。

---

### (2). 构造思路概述

1. 定义总模数：

   $$
   M = m_1 m_2 \cdots m_k
   $$

2. 对每个 $i$，定义：

   $$
   M_i = \frac{M}{m_i}
   $$

3. 由于 $m_i$ 与 $M_i$ 互素，存在模逆元 $y_i$，使得：

   $$
   M_i \cdot y_i \equiv 1 \pmod{m_i}
   $$

4. 构造解的形式为：

   $$
   x \equiv \sum_{i=1}^k a_i \cdot M_i \cdot y_i \pmod{M}
   $$

---

### (3). 构造正确性的验证

我们要证明：上述构造的 $x$ 一定满足所有同余方程。

在模 $m_j$ 下：

- 当 $i \ne j$ 时，$M_i$ 中包含 $m_j$ 因子，因此 $M_i \equiv 0 \pmod{m_j}$；
- 只有 $i = j$ 时，$M_j \cdot y_j \equiv 1 \pmod{m_j}$ 成立。

因此：

$$
x \equiv a_j \cdot M_j \cdot y_j \pmod{m_j}
$$

由于 $M_j \cdot y_j \equiv 1 \pmod{m_j}$，所以：

$$
x \equiv a_j \pmod{m_j}
$$

故该构造满足所有 $x \equiv a_i \pmod{m_i}$。

---

### (4). 解的唯一性

由于所有模数 $m_i$ 两两互素，其乘积 $M = m_1 m_2 \cdots m_k$ 是最小公倍数。

因此该解 $x$ 在模 $M$ 的意义下**唯一**。

换句话说，若存在两个满足上述同余组的解 $x$ 与 $x'$，则有：

$$
x \equiv x' \pmod{M}
$$

---

### (5). 举例验证

解如下同余方程组：

$$
\begin{cases}
x \equiv 2 \pmod{3} \\
x \equiv 3 \pmod{5} \\
x \equiv 2 \pmod{7}
\end{cases}
$$

步骤：

- $M = 3 \cdot 5 \cdot 7 = 105$
- $M_1 = 105 / 3 = 35$，$y_1 = 35^{-1} \mod 3 = 2$
- $M_2 = 105 / 5 = 21$，$y_2 = 21^{-1} \mod 5 = 1$
- $M_3 = 105 / 7 = 15$，$y_3 = 15^{-1} \mod 7 = 1$

代入公式：

$$
x \equiv 2 \cdot 35 \cdot 2 + 3 \cdot 21 \cdot 1 + 2 \cdot 15 \cdot 1 \pmod{105}
= (140 + 63 + 30) \mod 105 = \boxed{23}
$$

---

### (6). 总结

中国剩余定理的构造性解法关键在于：

- 借助模数互素性求出模逆元
- 利用加权求和构造满足所有同余的 $x$
- 解在模 $M$ 意义下唯一

最终公式为：

$$
x \equiv \sum_{i=1}^k a_i \cdot \left( \frac{M}{m_i} \right) \cdot \left( \left( \frac{M}{m_i} \right)^{-1} \mod m_i \right) \pmod{M}
$$

---

## 4. 计算模逆元（扩展欧几里得算法）

模逆元 $y_i$ 的求解是关键步骤，可以用扩展欧几里得算法计算。

```cpp
// 扩展欧几里得算法，计算 ax + by = gcd(a,b) 的解
int exgcd(int a, int b, int &x, int &y) {
    if (b == 0) { x = 1; y = 0; return a; }
    int d = exgcd(b, a % b, y, x);
    y -= (a / b) * x;
    return d;
}

// 计算 a 关于模 m 的逆元（假设 a 和 m 互质）
int modInverse(int a, int m) {
    int x, y;
    exgcd(a, m, x, y);
    x %= m;
    if (x < 0) x += m;
    return x;
}
```

---

## 5. 中国剩余定理代码实现（C++）

```cpp
#include <iostream>
#include <vector>
using namespace std;

// 扩展欧几里得
int exgcd(int a, int b, int &x, int &y) {
    if (b == 0) { x = 1; y = 0; return a; }
    int d = exgcd(b, a % b, y, x);
    y -= (a / b) * x;
    return d;
}

// 计算逆元
int modInverse(int a, int m) {
    int x, y;
    exgcd(a, m, x, y);
    x %= m;
    if (x < 0) x += m;
    return x;
}

// 中国剩余定理主函数
// 输入：模数数组 m，余数数组 a
// 返回 x，满足 x ≡ a[i] (mod m[i])
long long CRT(const vector<int>& m, const vector<int>& a) {
    long long M = 1;
    int n = m.size();
    for (int i = 0; i < n; ++i) M *= m[i];

    long long x = 0;
    for (int i = 0; i < n; ++i) {
        long long Mi = M / m[i];
        long long yi = modInverse(Mi % m[i], m[i]);
        x = (x + Mi * yi % M * a[i] % M) % M;
    }
    return (x + M) % M;
}

int main() {
    vector<int> m = {3, 5, 7};
    vector<int> a = {2, 3, 2};
    cout << "解为 x = " << CRT(m, a) << endl; // 输出 23
    return 0;
}
```

---

## 6. 应用举例

### (1). [P1495 【模板】中国剩余定理（CRT）](https://www.luogu.com.cn/problem/P1495)

UP 的 AC 代码：

```cpp
#include <iostream>
using namespace std;
const int N = 10;
int n;
long long r[N], p[N], M = 1;

long long CRT() {
	long long ans = 0;
	for (int i = 0; i < n; i ++) M *= p[i];

	for (int i = 0; i < n; i ++) {
		long long m = M / p[i];
		for (int j = 1; j <= 1e7; j ++) {
			if (m * j % p[i] == r[i]) {
				ans += m * j;
				break;
			}
		}
	}
	return ans % M;
}

int main() {
	ios::sync_with_stdio(false);
	cin.tie(0);
	cin >> n;

	for (int i = 0; i < n; i ++) cin >> p[i] >> r[i];

	cout << CRT();

	return 0;
}
```

### (2).[P4777 【模板】扩展中国剩余定理（EXCRT）](https://www.luogu.com.cn/problem/P4777)

UP 的 AC 代码：

```cpp
#include <cstdio>
int n;
long long a[100010], b[100010], ans, M, x, y;
long long exgcd(long long a, long long b, long long &x, long long &y){
    if(!b){ x = 1; y = 0; return a; }
    long long d = exgcd(b, a % b, x, y);
    long long z = x; x = y; y = z - (a / b) * y;
    return d;
}
long long Slow_Mul(long long n, long long k, long long mod){
    long long ans = 0;
    while(k){
      if(k & 1) ans = (ans + n) % mod;
      k >>= 1;
      n = (n + n) % mod;
    }
    return ans;
}
int main(){
    scanf("%d", &n);
    for(int i = 1; i <= n; ++i)
       scanf("%lld%lld", &b[i], &a[i]);
    ans = a[1];
    M = b[1];
    for(int i = 2; i <= n; ++i){
       long long B = ((a[i] - ans) % b[i] + b[i]) % b[i];
       long long GCD = exgcd(M, b[i], x, y);
       x = Slow_Mul(x, B / GCD, b[i]);
       ans += M * x;
       M *= b[i] / GCD;
       ans = (ans + M) % M;
    }
    printf("%lld\n", ans);
    return 0;
}

```

题解中也有很多不错的思路，可以去参考学习一下。

---

## 7. 总结(Chat-GPT代写)

中国剩余定理作为数论经典，打通了多模系统的桥梁。理解其原理与实现，可以帮助我们解决更多复杂的模运算问题。无论是算法竞赛还是实际应用，CRT 都是必备利器。
