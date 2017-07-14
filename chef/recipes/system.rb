#
# Cookbook Name:: chef-nodeapp
# Recipe:: system
#
# Copyright (C) 2016 Chris Allen
#
# All rights reserved - Do Not Redistribute
#

package "git"

# Install node and npm
include_recipe "nodejs::npm"

#Install sequelize cli globally
nodejs_npm "sequelize-cli@2.5.1"

# Add sequelize to path
link '/usr/local/bin/sequelize' do
  to "/usr/local/nodejs-#{node['nodejs']['install_method']}-#{node['nodejs']['version']}/bin/sequelize"
end