name             'chef-nodeapp'
maintainer       'Chris Allen'
maintainer_email 'chris@apaxsoftware.com'
license          'All rights reserved'
description      'Installs/Configures chef-nodeapp'
long_description 'Installs/Configures chef-nodeapp'
version          '0.1.0'

depends "apt"
depends "nodejs"
depends "supervisord"
depends "postgresql"
depends "database"