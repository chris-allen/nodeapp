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

package "postgresql"
package "postgresql-contrib"


bash 'set postgres password' do
  code "sudo -u postgres psql -U postgres -d template1 -c \"ALTER USER postgres WITH PASSWORD 'password';\""
end

bash 'createdb' do
  code "PGPASSWORD=password psql -h 127.0.0.1 -U postgres -c 'CREATE DATABASE nodeapp'"
  ignore_failure true
end
