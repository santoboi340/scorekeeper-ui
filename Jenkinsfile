// @Library('https://github.com/MagusTechSolutions/mts-jenkins-lib.git') _

library identifier: 'buildPipeline@master', 
  retriever: modernSCM([
    $class: 'GitSCMSource',
    credentialsId: 'github-repo-token',
    remote: 'https://github.com/MagusTechSolutions/mts-jenkins-lib.git'
  ])

buildPipeline(
    configFile: 'pipeline.yml',
    jwtCredsId: 'scorepal-rest-jwt-jenkins',
    sonarCredsId: 'Sonarqube'
)
