
## React编写的在线考试系统

对应的后端地址
[https://github.com/laincarl/exam-system-server](https://github.com/laincarl/exam-system-server)


本项目是利用React实现的考试系统

## 已完成功能：
- [x] 登录以及权限控制，包含三种角色（管理员，教师，学生），不同角色含有不同权限
- [x] 管理员对人员的管理
- [x] 教师对题库，考试，以及试卷的管理
- [x] 试题的导入功能 
- [x] 学生参加考试功能
- [x] 个人中心，考试历史

## 下载运行

``` bash
git clone git@github.com:laincarl/exam-system.git
cd exam-system
npm i
npm run dev
```

## 目录结构

```
.
├─config            //项目配置项 (postcss等)
├─src
│  ├─assets         //资源目录 (css 图片)
│  │  ├─css
│  │  └─image
│  ├─component      //组件目录
│  │  ├─common
│  │  │  └─question
│  │  ├─exam
│  │  └─manage
│  │      ├─exam
│  │      └─paper
│  ├─container      //页面目录
│  │  ├─account
│  │  ├─exam
│  │  └─manage
│  │      ├─analyze
│  │      ├─bank
│  │      ├─exam
│  │      ├─paper
│  │      └─user
│  ├─store          //store目录
│  │  ├─exam
│  │  └─manage
│  │      └─bank
│  └─util           //工具函数
└─webpack           //webpack配置
```

## 说明

如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

或者您可以 "follow" 一下，我会不断开源更多的有趣的项目
