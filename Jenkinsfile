pipeline {
   agent any

   stages {
      stage('Verify Branch') {
         steps {
            echo "$GIT_BRANCH"
         }
      }
      // stage('Docker Build with pwsh') {
      //    steps {
      //       pwsh (script: 'docker images -a')
      //       pwsh (script: """
      //          docker images -a
      //          docker build -t jenkinsarian .
      //          docker images -a
      //       """)
      //    }
      // }
      stage('Deploy to Az container registry') {
         environment {
            ENVIRONMENT = 'develop'
         }
         steps {
            echo "Deploying to ${ENVIRONMENT}"
            acrQuickTask azureCredentialsId: 'lynxServicePricipal', 
                        gitPath: '', 
                        gitRefspec: '', 
                        gitRepo: '', 
                        imageNames: [[image: 'lynxnextjs:latest']], 
                        registryName: 'lynxUIRegistry', 
                        resourceGroupName: 'Resource_Group_Linux', 
                        tarball: '', 
                        variant: ''  
         }
      }
      stage('Restart app service') {
         steps {
            azureCLI commands: [[exportVariablesString: '', script: 'az webapp restart --name LynxUI --resource-group Resource_Group_Linux']], principalCredentialId: 'lynxServicePricipal'
         }
      }
      // stage('Restart app service') {
      //    environment {
      //       def response = httpRequest authentication: 'azureCreds', httpMode: 'POST', responseHandle: 'NONE', url: 'https://management.azure.com/subscriptions/5f22d26b-3b11-49c7-9654-c3db6dc8a3aa/resourceGroups/Resource_Group_Linux/providers/Microsoft.Web/sites/lynxUI/restart?api-version=2019-08-01', wrapAsMultipart: false   
      //    }
      //    steps {
      //       echo "Status: ${response.status}"
      //    }
      // }
      stage('End Stage') {
         steps {
            echo "DONE..."
         }
      }
   }
}