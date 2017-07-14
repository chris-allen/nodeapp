#
# Cookbook Name:: chef-nodeapp
# Recipe:: app
#
# Copyright (C) 2016 Chris Allen
#
# All rights reserved - Do Not Redistribute
#

app = node.attribute?('vagrant') ? node['vagrant']['app'] : search('aws_opsworks_app').first
environment = app['environment']

# Some host OSs don't let npm create symlinks in the shared directory. This
# stores our node_modules on the VM and simply creates a mystery symlink file
# in the shared directory which is gitignored
directory "/home/ubuntu/node_modules" do
  owner "ubuntu"
  group "ubuntu"
  recursive true
end
link "/home/ubuntu/nodeapp/nodeapp/node_modules" do
  owner "ubuntu"
  group "ubuntu"
  to "/home/ubuntu/node_modules"
end

# Install package.json dependencies
nodejs_npm "npm-install" do
  path "/home/ubuntu/nodeapp/nodeapp"
  user "ubuntu"
  json true
end

# Initialize gitignored config using environment
template "/home/ubuntu/nodeapp/nodeapp/.config.json" do
  source 'config.json.erb'
  owner user
  group user
  mode '0644'
  variables :environment => environment
end

# Apply any migrations
bash "migrate" do
  code "npm run sequelize db:migrate"
  cwd "/home/ubuntu/nodeapp/nodeapp/api"
end