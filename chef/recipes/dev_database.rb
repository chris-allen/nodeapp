#
# Cookbook Name:: chef-nodeapp
# Recipe:: dev_database
#
# Copyright (C) 2016 Chris Allen
#
# All rights reserved - Do Not Redistribute

execute "apt-get update" do
  action :nothing
end.run_action(:run)
include_recipe "postgresql::server"
include_recipe "database::postgresql"

postgresql_connection_info = {
  :host => '127.0.0.1',
  :port => '5432',
  :username => 'postgres',
  :password => 'password'
}

postgresql_database 'nodeapp' do
  connection postgresql_connection_info
  action :create
end