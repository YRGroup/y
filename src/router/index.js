import Vue from 'vue'
import Router from 'vue-router'

// 临时页面
import dev from '@/components/dev'
// 主页
import main from '@/view/main/main'

// 功能模块
import addon from '@/view/addon/default'
import kechengbiao from '@/view/addon/kechengbiao'
import reader from '@/view/addon/reader'
import idol from '@/view/addon/idol'
import interview from '@/view/addon/interview'

// 学校
import news from '@/view/school/news'
import school from '@/view/school/main'
import newSchoolPost from '@/view/school/newpost'
import allSchoolPost from '@/view/school/all'

// 班级
import classmain from '@/view/class/main'
import classMainPage from '@/view/class/all'
import classmsg from '@/view/class/msg'
import notice from '@/view/class/notice'
import homework from '@/view/class/homework'
import kcb from '@/view/class/kcb'
import newClassPost from '@/view/class/newpost'
import manage from '@/view/class/manage'

// 教师
import teacher from '@/view/teacher/main'
import teacherprofile from '@/view/teacher/profile'
import teacherfeed from '@/view/teacher/feed'
import teacherwork from '@/view/teacher/work'
import information from '@/view/teacher/information'

// 学生
import student from '@/view/student/main'
import studentMainPage from '@/view/student/all'
import score from '@/view/student/score'
import studentfeed from '@/view/student/feed'
import schoolcard from '@/view/student/schoolcard'
import timeline from '@/view/student/timeline'
import studentedit from '@/view/student/edit'
import studentprofile from '@/view/student/profile'
import studentparent from '@/view/student/parent'

// 注册
import reg from '@/view/login/reg'

// 登陆
import login from '@/view/login/login'

// 通讯录
import contact from '@/view/contact/main'
import msg from '@/view/contact/allmsg'
import mymsg from '@/view/contact/mymsg'

// 用户
import user from '@/view/user/main'
import edit from '@/view/user/edit'
import parentcenter from '@/view/user/parent'
import studentcenter from '@/view/user/student'
import teachercenter from '@/view/user/teacher'
import editcode from '@/view/user/editcode'

Vue.use(Router)


export default new Router({
    // 历史记录模式，需要服务器配置支持
    // mode: 'history',
    routes: [
        {//测试主页
            path: '/',
            name: 'dev',
            component: dev  
        },
        {//主页
            path: '/main',
            name: 'main',
            component: main
        },
        {//扩展模块
            path: '/addon',
            component: addon,
            children:[
                {
                    path: 'kechengbiao',
                    name: 'kechengbiao',
                    component: kechengbiao
                },
                {
                    path: 'reader',
                    name: 'reader',
                    component: reader
                },
                {
                    path: 'idol',
                    name: 'idol',
                    component: idol
                },
                {
                    path: 'interview',
                    name: 'interview',
                    component: interview
                },
            ]
        },
        {//班级
            path: '/class/:classId/',
            component: classmain,
            children: [
                {
                    path: '',
                    component: classMainPage
                },
                {
                    path: 'work',
                    component: homework
                },
                // {
                //     path: 'msg/:msgId',
                //     component: classmsg
                // },
                {
                    path: 'kcb',
                    component: kcb
                },  
                {
                    path: 'new',
                    component: newClassPost
                },   
                {
                    path: 'notice',
                    component: notice
                },  
                {
                    path: 'manage',
                    component: manage
                },      
            ]
        },
        {//班级动态详情
            path: '/class/:classId/msg/:msgId',
            name: 'classmsg',
            component: classmsg
        },
        {//教师
            path: '/teacher/:teacherId',
            component: teacher,
            children: [
                {
                    path: '',
                    name: 'teacher',
                    component: teacherprofile
                },
                {
                    path: 'profile',
                    component: teacherprofile
                },
                {
                    path: 'feed',
                    component: teacherfeed
                },
                {
                    path: 'work',
                    component: teacherwork
                }
            ]
        },
        {// 教师资料
            path: '/teacher/:teacherId/information',
            name: 'information',
            component: information
        },
        {//学生
            path: '/student/:studentId',
            component: student,
            children:[
                {
                    path: '',
                    component: studentMainPage
                },
                {
                    path: 'feed',
                    component: studentfeed
                },
                {
                    path: 'schoolcard',
                    component: schoolcard
                },
                {
                    path: 'timeline',
                    component: timeline
                },
                {
                    path: 'edit',
                    component: studentedit
                },
                {
                    path: 'parent',
                    component: studentparent
                }
            ]
        },
        {// 学生成绩
            path: '/student/:studentId/profile',
            name: 'studentprofile',
            component: studentprofile
        },
        {// 学生成绩报告
            path: '/student/:studentId/score/:examId',
            name: 'score',
            component: score
        },
        {// 学生编辑信息
            path: '/student/:studentId/edit',
            name: 'studentedit',
            component: studentedit
        },
        {//学校
            path: '/school',
            component: school,
            children: [
                {
                    path: '',
                    component: allSchoolPost
                },
                {
                    path: 'new',
                    name: 'newSchoolPost',
                    component: newSchoolPost
                },
                {
                    path: 'all',
                    name: 'allSchoolPost',
                    component: allSchoolPost
                },
                {
                    path: 'news',
                    name: 'news',
                    component: news
                }
            ]
        },
        // 注册 登陆
        {
            path: '/reg',
            name: 'reg',
            component: reg,
        },        
        {
            path: '/login',
            name: 'login',
            component: login
        },   

        // 通讯录
        {
            path: '/contact',
            name: 'contact',
            component: contact
        },
        {
            path: '/msg/:userId',
            name: 'msg',
            component: msg
        },
        {
            path: '/mymsg',
            name: 'mymsg',
            component: mymsg
        },

        // 用户
        {
            path: '/user',
            name: 'user',
            component: user
        },
        {
            path: '/edit',
            name: 'edit',
            component: edit
        },
        {
            path: '/parentcenter',
            name: 'parentcenter',
            component: parentcenter
        },
        {
            path: '/studentcenter',
            name: 'studentcenter',
            component: studentcenter
        },
        {
            path: '/teachercenter',
            name: 'teachercenter',
            component: teachercenter
        },
        {
            path: '/user/editcode',
            name: 'editcode',
            component: editcode
        },
    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})