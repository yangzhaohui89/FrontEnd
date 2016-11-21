/**
 * Created by yzh on 2016/11/21.
 */
module.exports = function(grunt){
    //任务配置，所有插件的配置信息
    grunt.initConfig({
        //获取package.json
        pkg:grunt.file.readJSON('package.json'),
        //uglify 插件的配置信息
        uglify:{
            options:{
                stripBanners:true,
                banner: '/*! <%= pkg.name %>-<%=pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist:{
                src:'src/test.js',
                dest:'build/<%=pkg.name%>-<%=pkg.version%>.js.min.js'
            }
        },
        jshint:{
            build:['Gruntfile.js','src/*.js'],
            options:{
                jshintrc:'.jshintrc'
            }
        },
        // watch 插件的配置信息
        watch:{
            build:{
                files:['src/*.js','src/*.css','src/*html'],
                tasks:['jshint','uglify'],
                options:{spawn:false}
            }
        }
    });
    //告诉grunt 将要使用的插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //告诉grunt当我们在终端中输入grunt时需要做什么
    grunt.registerTask('default',['uglify','jshint','watch']);
};
