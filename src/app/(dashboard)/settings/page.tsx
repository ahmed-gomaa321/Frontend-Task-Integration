"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  X,
  User,
  Shield,
  Tag,
  Users,
  CreditCard,
  Webhook,
  FileText,
  Upload,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Tabs defaultValue="profile" orientation="vertical" className="gap-6">
        <TabsList className="gap-2 p-3">
          <TabsTrigger value="profile" className="px-6 py-2.5">
            <User />
            Profile Details
          </TabsTrigger>
          <TabsTrigger value="security" className="px-6 py-2.5">
            <Shield />
            Security
          </TabsTrigger>
          <TabsTrigger value="tags" className="px-6 py-2.5">
            <Tag />
            Tags
          </TabsTrigger>
          <TabsTrigger value="users" className="px-6 py-2.5">
            <Users />
            Users
          </TabsTrigger>
          <TabsTrigger value="billing" className="px-6 py-2.5">
            <CreditCard />
            Billing & Usage
          </TabsTrigger>
          <TabsTrigger value="api" className="px-6 py-2.5">
            <Webhook />
            API & Webhooks
          </TabsTrigger>
          <TabsTrigger value="summary-template" className="px-6 py-2.5">
            <FileText />
            Summary Template
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileTab />
        </TabsContent>
        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>
        <TabsContent value="tags">
          <TagsTab />
        </TabsContent>
        <TabsContent value="users">
          <UsersTab />
        </TabsContent>
        <TabsContent value="billing">
          <BillingTab />
        </TabsContent>
        <TabsContent value="api">
          <ApiTab />
        </TabsContent>
        <TabsContent value="summary-template">
          <SummaryTemplateTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ProfileTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Info</CardTitle>
          <CardDescription>
            Update your photo and personal details here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Profile Image</Label>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-muted text-lg font-medium">
                JD
              </div>
              <div className="flex flex-1 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors hover:border-primary/50 hover:bg-muted/50">
                <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
                <p className="text-sm font-medium">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              This will be displayed on your profile.
            </p>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name</Label>
            <Input id="company-name" placeholder="Acme Inc." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              defaultValue="john@example.com"
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select disabled defaultValue="admin">
              <SelectTrigger id="role" className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Location & Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select>
              <SelectTrigger id="country" className="w-full">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="gb">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
                <SelectItem value="fr">France</SelectItem>
                <SelectItem value="jp">Japan</SelectItem>
                <SelectItem value="br">Brazil</SelectItem>
                <SelectItem value="in">India</SelectItem>
                <SelectItem value="ae">United Arab Emirates</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select>
              <SelectTrigger id="timezone" className="w-full">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc-12">(UTC-12:00) Baker Island</SelectItem>
                <SelectItem value="utc-8">(UTC-08:00) Pacific Time</SelectItem>
                <SelectItem value="utc-7">(UTC-07:00) Mountain Time</SelectItem>
                <SelectItem value="utc-6">(UTC-06:00) Central Time</SelectItem>
                <SelectItem value="utc-5">(UTC-05:00) Eastern Time</SelectItem>
                <SelectItem value="utc-0">(UTC+00:00) London, Dublin</SelectItem>
                <SelectItem value="utc+1">(UTC+01:00) Berlin, Paris</SelectItem>
                <SelectItem value="utc+3">(UTC+03:00) Moscow, Riyadh</SelectItem>
                <SelectItem value="utc+4">(UTC+04:00) Dubai, Baku</SelectItem>
                <SelectItem value="utc+5.5">(UTC+05:30) Mumbai, Kolkata</SelectItem>
                <SelectItem value="utc+8">(UTC+08:00) Singapore, Beijing</SelectItem>
                <SelectItem value="utc+9">(UTC+09:00) Tokyo, Seoul</SelectItem>
                <SelectItem value="utc+10">(UTC+10:00) Sydney, Melbourne</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className="flex items-center gap-2">
            <Checkbox id="newsletter" />
            <Label htmlFor="newsletter" className="font-normal">
              Subscribe to newsletter
            </Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Update Password</Button>
        </CardFooter>
      </Card>

    </div>
  );
}

const TAG_PRESET_COLORS = [
  "#EF4444",
  "#F97316",
  "#EAB308",
  "#22C55E",
  "#14B8A6",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#6B7280",
  "#1D4ED8",
];

function TagsTab() {
  const [tags, setTags] = useState([
    { id: "1", name: "VIP", description: "High-value customer requiring priority treatment", color: "#EAB308" },
    { id: "2", name: "New Lead", description: "Recently acquired contact not yet qualified", color: "#3B82F6" },
    { id: "3", name: "Follow Up", description: "Requires a follow-up call or message", color: "#22C55E" },
    { id: "4", name: "Urgent", description: "Time-sensitive request needing immediate attention", color: "#EF4444" },
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [newTagDescription, setNewTagDescription] = useState("");
  const [newTagColor, setNewTagColor] = useState(TAG_PRESET_COLORS[5]);

  function handleAddTag() {
    if (!newTagName.trim()) return;
    setTags((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: newTagName.trim(),
        description: newTagDescription.trim(),
        color: newTagColor,
      },
    ]);
    setNewTagName("");
    setNewTagDescription("");
    setNewTagColor(TAG_PRESET_COLORS[5]);
    setDialogOpen(false);
  }

  function handleDeleteTag(id: string) {
    setTags((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tags</CardTitle>
        <CardDescription>
          Manage tags used across your workspace for organizing contacts and
          conversations.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Tag
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Tag</DialogTitle>
              <DialogDescription>
                Add a new tag to organize your contacts and conversations.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="tag-name">Name</Label>
                <Input
                  id="tag-name"
                  placeholder="e.g. VIP, Callback, Interested"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tag-description">Description</Label>
                <Textarea
                  id="tag-description"
                  placeholder="Describe when this tag should be applied..."
                  rows={3}
                  value={newTagDescription}
                  onChange={(e) => setNewTagDescription(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Be specific for the AI to let them know when to use this tag.
                </p>
              </div>
              <div className="space-y-2">
                <Label>Color</Label>
                <div className="flex items-center gap-2">
                  {TAG_PRESET_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-transform hover:scale-110"
                      style={{
                        backgroundColor: color,
                        borderColor:
                          newTagColor === color
                            ? "var(--foreground)"
                            : "transparent",
                      }}
                      onClick={() => setNewTagColor(color)}
                    >
                      {newTagColor === color && (
                        <svg
                          className="h-3.5 w-3.5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                  <div className="relative ml-1">
                    <input
                      type="color"
                      value={newTagColor}
                      onChange={(e) => setNewTagColor(e.target.value)}
                      className="absolute inset-0 h-7 w-7 cursor-pointer opacity-0"
                    />
                    <div
                      className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/40"
                      style={{
                        background: TAG_PRESET_COLORS.includes(newTagColor)
                          ? undefined
                          : newTagColor,
                      }}
                    >
                      {TAG_PRESET_COLORS.includes(newTagColor) && (
                        <Plus className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Preview</Label>
                <div>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
                    style={{ backgroundColor: newTagColor }}
                  >
                    {newTagName || "Tag name"}
                  </span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTag} disabled={!newTagName.trim()}>
                Create Tag
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Separator />
        <div className="space-y-2">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center justify-between rounded-md border px-4 py-2"
            >
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
                  style={{ backgroundColor: tag.color }}
                >
                  {tag.name}
                </span>
                {tag.description && (
                  <span className="text-sm text-muted-foreground">
                    {tag.description}
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => handleDeleteTag(tag.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function UsersTab() {
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Member",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Member",
    },
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+20");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setDepartment("");
    setEmail("");
    setPhone("+20");
    setPassword("");
    setRole("");
  };

  const handleInvite = () => {
    setUsers((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: `${firstName} ${lastName}`,
        email,
        role: role.charAt(0).toUpperCase() + role.slice(1),
      },
    ]);
    setDialogOpen(false);
    resetForm();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>
          Manage team members and their roles in your workspace.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Invite User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite User</DialogTitle>
              <DialogDescription>
                Add a new team member to your workspace.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    id="first-name"
                    placeholder="e.g. Sarah"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input
                    id="last-name"
                    placeholder="e.g. Mostafa"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  placeholder="e.g. Marketing"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invite-email">Email</Label>
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="e.g. sarahmo@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invite-phone">Phone Number</Label>
                <Input
                  id="invite-phone"
                  type="tel"
                  placeholder="+20"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invite-password">Password</Label>
                <Input
                  id="invite-password"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-role">User Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger id="user-role" className="w-full">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                disabled={!firstName || !lastName || !email || !password || !role}
                onClick={handleInvite}
              >
                Invite User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="w-[50px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon-sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function BillingTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            Manage your subscription and billing details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-md border p-4">
            <div>
              <p className="font-medium">Pro Plan</p>
              <p className="text-sm text-muted-foreground">
                $49/month &middot; Billed monthly
              </p>
            </div>
            <Button variant="outline">Change Plan</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage</CardTitle>
          <CardDescription>
            Your current usage for this billing period.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Contacts</span>
              <span className="text-muted-foreground">2,450 / 10,000</span>
            </div>
            <div className="h-2 rounded-full bg-muted">
              <div className="h-2 w-1/4 rounded-full bg-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Messages Sent</span>
              <span className="text-muted-foreground">8,200 / 50,000</span>
            </div>
            <div className="h-2 rounded-full bg-muted">
              <div className="h-2 w-[16%] rounded-full bg-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>AI Summaries</span>
              <span className="text-muted-foreground">340 / 1,000</span>
            </div>
            <div className="h-2 rounded-full bg-muted">
              <div className="h-2 w-[34%] rounded-full bg-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ApiTab() {
  const [showKey, setShowKey] = useState(false);
  const apiKey = "sk-olimi-xxxxxxxxxxxxxxxxxxxxxxxxxxxx";

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>
            Manage API keys for integrating with external services.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 rounded-md border p-3">
            <code className="flex-1 text-sm">
              {showKey ? apiKey : "sk-olimi-••••••••••••••••••••••••••••"}
            </code>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
            <Button variant="ghost" size="icon-sm">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Generate New Key
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Webhooks</CardTitle>
          <CardDescription>
            Configure webhook endpoints to receive real-time event
            notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {[
              {
                url: "https://example.com/webhooks/messages",
                event: "message.received",
              },
              {
                url: "https://example.com/webhooks/contacts",
                event: "contact.created",
              },
            ].map((webhook) => (
              <div
                key={webhook.url}
                className="flex items-center justify-between rounded-md border px-4 py-2"
              >
                <div>
                  <p className="text-sm font-medium">{webhook.url}</p>
                  <p className="text-xs text-muted-foreground">
                    {webhook.event}
                  </p>
                </div>
                <Button variant="ghost" size="icon-sm">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input placeholder="https://your-app.com/webhook" className="flex-1" />
            <Button>Add Webhook</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryTemplateTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary Template</CardTitle>
        <CardDescription>
          Customize the template used for generating AI conversation summaries.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="template">Template</Label>
          <Textarea
            id="template"
            rows={12}
            placeholder="Enter your summary template..."
            defaultValue={`## Conversation Summary

**Customer:** {{customer_name}}
**Date:** {{date}}
**Agent:** {{agent_name}}

### Key Points
{{key_points}}

### Action Items
{{action_items}}

### Sentiment
{{sentiment}}`}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Available variables: {"{{customer_name}}"}, {"{{date}}"},{" "}
          {"{{agent_name}}"}, {"{{key_points}}"}, {"{{action_items}}"},{" "}
          {"{{sentiment}}"}, {"{{duration}}"}, {"{{channel}}"}
        </p>
      </CardContent>
      <CardFooter>
        <Button>Save Template</Button>
      </CardFooter>
    </Card>
  );
}
