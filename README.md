薅[91goout](http://www.91goout.com)的羊毛

尝试登陆不同账号并获取账号的过期时间，筛选出还未过期的账号

1. POST方法请求http://www.91goout.com/auth/login，获取cookie

2. GET方法请求http://www.91goout.com/user，请求头的Cookie字段为第1步得到的cookie值，实现登陆状态，进入用户页

3. 解析用户页的html，获取"等级到期时间"，并比对