#
# Cookbook Name:: chef-nodeapp
# Recipe:: node
#
# Copyright (C) 2016 Chris Allen
#
# All rights reserved - Do Not Redistribute
#

if Dir.exists? "/home/vagrant"
  user = "vagrant"
else
  user = "ubuntu"
end


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

nodejs_npm "npm-install" do
  path "/home/#{user}/nodeapp/nodeapp"
  user "#{user}"
  json true
end

bash "migrate" do
  code "sequelize db:migrate"
  cwd "/home/#{user}/nodeapp/nodeapp/api"
end