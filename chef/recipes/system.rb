#
# Cookbook Name:: chef-nodeapp
# Recipe:: system
#
# Copyright (C) 2016 Chris Allen
#
# All rights reserved - Do Not Redistribute
#

# Grab git for code recipe
package "git"

# Install node and npm
include_recipe "nodejs::npm"

Chef::Application.fatal!("This causes 'setup' to fail!")