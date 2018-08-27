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
user = node.attribute?('vagrant') ? 'vagrant' : 'ubuntu'

# Some host OSs don't let npm create symlinks in the shared directory. This
# stores our node_modules on the VM and simply creates a mystery symlink file
# in the shared directory which is gitignored
directory "/home/#{user}/node_modules" do
  owner "#{user}"
  group "#{user}"
  recursive true
end
link "/home/#{user}/nodeapp/nodeapp/node_modules" do
  owner "#{user}"
  group "#{user}"
  to "/home/#{user}/node_modules"
end

# Install package.json dependencies
nodejs_npm "npm-install" do
  path "/home/#{user}/nodeapp/nodeapp"
  user "#{user}"
  json true
end

# Initialize gitignored config using environment
template "/home/#{user}/nodeapp/nodeapp/.config.json" do
  source 'config.json.erb'
  owner user
  group user
  mode '0644'
  variables :environment => environment
end

# Apply any migrations
bash "migrate" do
  code "npm run sequelize db:migrate"
  cwd "/home/#{user}/nodeapp/nodeapp/api"
end