import Vue from 'vue'
import Router from 'vue-router'

import Hello from '@/components/HelloFromVux'
import newless from '@/components/l'

import addon from '@/view/addon/main'
import kechengbiao from '@/view/addon/kechengbiao'
import reader from '@/view/addon/reader'
import remark from '@/view/addon/remark'
import schoolcard from '@/view/addon/schoolcard'
import score from '@/view/addon/score'
import timeline from '@/view/addon/timeline'

import classmain from '@/view/class/main'
import classall from '@/view/class/all'
import classmsg from '@/view/class/msg'
import homework from '@/view/class/homework'
import student from '@/view/class/student'
import kcb from '@/view/class/kcb'

import teacher from '@/view/teacher/main'
import teacherprofile from '@/view/teacher/profile'
import teacherfeed from '@/view/teacher/feed'
import teacherwork from '@/view/teacher/work'

import reg from '@/view/login/reg'
import step1 from '@/view/login/step1'
import step2 from '@/view/login/step2'
import step3 from '@/view/login/step3'

import login from '@/view/login/login'
import teacherlogin from '@/view/login/teacher'
import studentlogin from '@/view/login/student'
import parentlogin from '@/view/login/parent'

import main from '@/view/main/main'
import banji from '@/view/main/class'
import news from '@/view/main/news'
import school from '@/view/main/school'

import msg from '@/view/msg/main'
import allmsg from '@/view/msg/allmsg'
import mymsg from '@/view/msg/mymsg'

import user from '@/view/user/main'
import edit from '@/view/user/edit'
import parentcenter from '@/view/user/parent'
import studentcenter from '@/view/user/student'
import teachercenter from '@/view/user/teacher'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [{
            path: '/',
            name: 'Hello',
            component: Hello
        },
        {
            path: '/l',
            name: 'newless',
            component: newless
        },
        {
            path: '/addon',
            name: 'addon',
            component: addon
        },
        {
            path: '/kechengbiao',
            name: 'kechengbiao',
            component: kechengbiao
        },
        {
            path: '/reader',
            name: 'reader',
            component: reader
        },
        {
            path: '/remark',
            name: 'remark',
            component: remark
        },
        {
            path: '/schoolcard',
            name: 'schoolcard',
            component: schoolcard
        },
        {
            path: '/score',
            name: 'score',
            component: score
        },
        {
            path: '/timeline',
            name: 'timeline',
            component: timeline
        },
        {
            path: '/class',
            component: classmain,
            children: [
                {
                    path: '',
                    component: classall
                },
                {
                    path: 'all',
                    component: classall
                },
                {
                    path: 'work',
                    component: homework
                },
                {
                    path: 'msg',
                    component: classmsg
                },
                {
                    path: 'student',
                    component: student
                },
                {
                    path: 'kcb',
                    component: kcb
                },         
            ]
        },
        {
            path: '/teacher/:id',
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
        {
            path: '/reg',
            component: reg,
            children: [
                {
                path: '',
                component: step1
                },
                {
                path: 'step1',
                component: step1
                },
                {
                path: 'step2',
                component: step2
                },
                {
                path: 'step3',
                component: step3
                }            
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/teacherlogin',
            name: 'teacherlogin',
            component: teacherlogin
        },
        {
            path: '/studentlogin',
            name: 'studentlogin',
            component: studentlogin
        },
        {
            path: '/parentlogin',
            name: 'parentlogin',
            component: parentlogin
        },
        {
            path: '/main',
            name: 'main',
            component: main
        },
        {
            path: '/banji',
            name: 'banji',
            component: banji
        },
        {
            path: '/news',
            name: 'news',
            component: news
        },
        {
            path: '/school',
            name: 'school',
            component: school
        },
        {
            path: '/msg',
            name: 'msg',
            component: msg
        },
        {
            path: '/allmsg',
            name: 'allmsg',
            component: allmsg
        },
        {
            path: '/mymsg',
            name: 'mymsg',
            component: mymsg
        },
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
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})