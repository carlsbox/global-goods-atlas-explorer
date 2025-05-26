
import { useState, useEffect } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Pencil, 
  Trash, 
  Search, 
  Plus, 
  PlusCircle,
  Users,
  Loader,
  Mail
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor";
  status: "active" | "inactive" | "pending";
  lastLogin: string | null;
  dateCreated: string;
}

// Mock data for users
const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    lastLogin: "2025-04-14 09:23",
    dateCreated: "2025-01-15",
  },
  {
    id: "2",
    name: "Regular Editor",
    email: "user@example.com",
    role: "editor",
    status: "active",
    lastLogin: "2025-04-12 14:35",
    dateCreated: "2025-01-20",
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "editor",
    status: "active",
    lastLogin: "2025-04-10 11:15",
    dateCreated: "2025-02-05",
  },
  {
    id: "4",
    name: "John Davis",
    email: "john@example.com",
    role: "admin",
    status: "active",
    lastLogin: "2025-04-13 16:42",
    dateCreated: "2025-01-18",
  },
  {
    id: "5",
    name: "Sara Wilson",
    email: "sara@example.com",
    role: "editor",
    status: "pending",
    lastLogin: null,
    dateCreated: "2025-04-08",
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  
  // New user form state
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "editor",
  });
  const [isSaving, setIsSaving] = useState(false);
  
  // Check if current user is an admin
  const [isAdmin, setIsAdmin] = useState(false);
  const { language } = useLanguage();
  
  useEffect(() => {
    const userStr = localStorage.getItem("cms_user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setIsAdmin(user.role === "admin");
    }
  }, []);
  
  useEffect(() => {
    // Load mock users data
    const loadUsers = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setUsers(mockUsers);
          setFilteredUsers(mockUsers);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Failed to load users", error);
        toast.error("Failed to load users");
        setIsLoading(false);
      }
    };
    
    loadUsers();
  }, []);
  
  // Filter users when search or filter criteria change
  useEffect(() => {
    const filtered = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = !roleFilter || user.role === roleFilter;
      const matchesStatus = !statusFilter || user.status === statusFilter;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
    
    setFilteredUsers(filtered);
  }, [users, searchQuery, roleFilter, statusFilter]);
  
  // Handle adding a new user
  const handleAddUser = () => {
    setIsSaving(true);
    
    // Validate form
    if (!newUser.name.trim() || !newUser.email.trim()) {
      toast.error("Please fill out all required fields");
      setIsSaving(false);
      return;
    }
    
    // In a real app, this would be an API call
    setTimeout(() => {
      const newUserId = (users.length + 1).toString();
      
      const addedUser: User = {
        id: newUserId,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role as "admin" | "editor",
        status: "pending",
        lastLogin: null,
        dateCreated: new Date().toISOString().split('T')[0],
      };
      
      setUsers([...users, addedUser]);
      
      // Reset form
      setNewUser({
        name: "",
        email: "",
        role: "editor",
      });
      
      setIsAddUserOpen(false);
      setIsSaving(false);
      
      toast.success("User invitation sent", {
        description: `An invitation has been sent to ${addedUser.email}`,
      });
    }, 1500);
  };
  
  // Handle changing user role
  const handleChangeRole = (userId: string, newRole: "admin" | "editor") => {
    // In a real app, this would be an API call
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, role: newRole } : user
    );
    
    setUsers(updatedUsers);
    
    toast.success(`User role updated to ${newRole}`, {
      description: `User ID: ${userId}`,
    });
  };
  
  // Handle user deletion
  const handleDeleteUser = (userId: string) => {
    // In a real app, this would be an API call
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    
    toast.success("User deleted successfully");
  };
  
  // Handle user invitation resend
  const handleResendInvite = (userEmail: string) => {
    toast.success("Invitation resent", {
      description: `A new invitation has been sent to ${userEmail}`,
    });
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Users</h1>
        {isAdmin && (
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite New User</DialogTitle>
                <DialogDescription>
                  Send an invitation to join the CMS. The user will receive an email with instructions to set up their account.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Full name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUser} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Send Invitation
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Roles</SelectItem>
            <SelectItem value="admin">Administrators</SelectItem>
            <SelectItem value="editor">Editors</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Users table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead className="hidden md:table-cell">Role</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden lg:table-cell">Last Login</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    <span className="ml-2">Loading users...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 rounded-full h-8 w-8 flex items-center justify-center text-primary font-medium">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                      {user.role === "admin" ? "Administrator" : "Editor"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge 
                      variant={
                        user.status === "active" ? "outline" : 
                        user.status === "pending" ? "secondary" : 
                        "destructive"
                      }
                    >
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {user.lastLogin || "Never logged in"}
                  </TableCell>
                  <TableCell className="text-right">
                    {isAdmin && (
                      <div className="flex justify-end gap-1">
                        {user.status === "pending" && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleResendInvite(user.email)}
                            title="Resend invitation"
                          >
                            <Mail className="h-4 w-4" />
                            <span className="sr-only">Resend invitation</span>
                          </Button>
                        )}
                        
                        {/* Change role button */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" title="Change role">
                              <Users className="h-4 w-4" />
                              <span className="sr-only">Change role</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Change User Role</DialogTitle>
                              <DialogDescription>
                                Change the role for {user.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <p className="text-sm text-muted-foreground mb-4">
                                Current role: <Badge variant="outline">{user.role}</Badge>
                              </p>
                              <div className="space-y-2">
                                <Label>New Role</Label>
                                <div className="flex gap-2">
                                  <Button 
                                    variant={user.role === "editor" ? "outline" : "default"}
                                    className="flex-1"
                                    onClick={() => handleChangeRole(user.id, "editor")}
                                    disabled={user.role === "editor"}
                                  >
                                    Editor
                                  </Button>
                                  <Button 
                                    variant={user.role === "admin" ? "outline" : "default"}
                                    className="flex-1"
                                    onClick={() => handleChangeRole(user.id, "admin")}
                                    disabled={user.role === "admin"}
                                  >
                                    Administrator
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        {/* Delete user button */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" title="Delete user">
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete user</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete User</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete this user? This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Cancel</Button>
                              <Button 
                                variant="destructive"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                Delete User
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
