
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, CalendarPlus, Clock, Pencil, Plus, Trash2 } from 'lucide-react';

interface Update {
  id: string;
  title: string;
  description: string;
  date: string;
  isComingSoon: boolean;
  isLatestUpdate: boolean;
}

const AdminUpdates = () => {
  const { toast } = useToast();
  const [updates, setUpdates] = useState<Update[]>([
    {
      id: '1',
      title: 'New Vendor Portal',
      description: 'Enhanced dashboard for vendors with analytics and order management.',
      date: '2025-06-15',
      isComingSoon: true,
      isLatestUpdate: false
    },
    {
      id: '2',
      title: 'Mobile App Launch',
      description: 'Our mobile app is now available on iOS and Android stores.',
      date: '2025-05-01',
      isComingSoon: false,
      isLatestUpdate: true
    },
    {
      id: '3',
      title: 'Same-Day Delivery',
      description: 'Now offering same-day delivery for orders placed before 11 AM.',
      date: '2025-04-15',
      isComingSoon: false,
      isLatestUpdate: true
    }
  ]);

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [currentUpdate, setCurrentUpdate] = useState<Update>({
    id: '',
    title: '',
    description: '',
    date: '',
    isComingSoon: false,
    isLatestUpdate: false
  });

  const handleAddUpdate = () => {
    setCurrentUpdate({
      id: Date.now().toString(),
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      isComingSoon: false,
      isLatestUpdate: false
    });
    setAddDialogOpen(true);
  };

  const handleEditUpdate = (update: Update) => {
    setCurrentUpdate({ ...update });
    setEditDialogOpen(true);
  };

  const handleDeleteUpdate = (id: string) => {
    setUpdates(updates.filter(update => update.id !== id));
    toast({
      title: "Update Deleted",
      description: "The update has been successfully deleted.",
    });
  };

  const handleSaveUpdate = (isNew: boolean) => {
    if (isNew) {
      setUpdates([...updates, currentUpdate]);
      setAddDialogOpen(false);
      toast({
        title: "Update Added",
        description: "New update has been successfully added.",
      });
    } else {
      setUpdates(updates.map(update => update.id === currentUpdate.id ? currentUpdate : update));
      setEditDialogOpen(false);
      toast({
        title: "Update Modified",
        description: "The update has been successfully modified.",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentUpdate({
      ...currentUpdate,
      [name]: value
    });
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setCurrentUpdate({
      ...currentUpdate,
      [name]: checked
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Updates</h1>
      <p className="text-muted-foreground">
        Manage coming soon features and latest updates
      </p>

      <div className="mt-6">
        <div className="flex justify-end mb-4">
          <Button onClick={handleAddUpdate}>
            <Plus className="h-4 w-4 mr-2" /> Add Update
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Updates</TabsTrigger>
            <TabsTrigger value="coming-soon">Coming Soon</TabsTrigger>
            <TabsTrigger value="latest">Latest Updates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Updates</CardTitle>
                <CardDescription>
                  View and manage all updates in one place
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {updates.map((update) => (
                      <TableRow key={update.id}>
                        <TableCell className="font-medium">{update.title}</TableCell>
                        <TableCell>{update.description.slice(0, 60)}...</TableCell>
                        <TableCell>{update.date}</TableCell>
                        <TableCell>
                          {update.isComingSoon ? 
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Coming Soon
                            </span> : 
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Latest Update
                            </span>
                          }
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleEditUpdate(update)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteUpdate(update.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coming-soon">
            <Card>
              <CardHeader>
                <CardTitle>Coming Soon Features</CardTitle>
                <CardDescription>
                  Manage upcoming features and announcements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Expected Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {updates.filter(update => update.isComingSoon).map((update) => (
                      <TableRow key={update.id}>
                        <TableCell className="font-medium">{update.title}</TableCell>
                        <TableCell>{update.description}</TableCell>
                        <TableCell>{update.date}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleEditUpdate(update)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteUpdate(update.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="latest">
            <Card>
              <CardHeader>
                <CardTitle>Latest Updates</CardTitle>
                <CardDescription>
                  Manage recently released features and announcements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Release Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {updates.filter(update => update.isLatestUpdate).map((update) => (
                      <TableRow key={update.id}>
                        <TableCell className="font-medium">{update.title}</TableCell>
                        <TableCell>{update.description}</TableCell>
                        <TableCell>{update.date}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleEditUpdate(update)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteUpdate(update.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Update Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Update</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                name="title" 
                value={currentUpdate.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                rows={4}
                value={currentUpdate.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <div className="flex gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <Input 
                  id="date" 
                  name="date" 
                  type="date"
                  value={currentUpdate.date}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="is-coming-soon"
                checked={currentUpdate.isComingSoon}
                onCheckedChange={(checked) => handleSwitchChange('isComingSoon', checked)}
              />
              <Label htmlFor="is-coming-soon">Mark as Coming Soon</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="is-latest-update"
                checked={currentUpdate.isLatestUpdate}
                onCheckedChange={(checked) => handleSwitchChange('isLatestUpdate', checked)}
              />
              <Label htmlFor="is-latest-update">Mark as Latest Update</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => handleSaveUpdate(true)}>Add Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Update Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Update</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input 
                id="edit-title" 
                name="title" 
                value={currentUpdate.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea 
                id="edit-description" 
                name="description" 
                rows={4}
                value={currentUpdate.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-date">Date</Label>
              <div className="flex gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <Input 
                  id="edit-date" 
                  name="date" 
                  type="date"
                  value={currentUpdate.date}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-is-coming-soon"
                checked={currentUpdate.isComingSoon}
                onCheckedChange={(checked) => handleSwitchChange('isComingSoon', checked)}
              />
              <Label htmlFor="edit-is-coming-soon">Mark as Coming Soon</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-is-latest-update"
                checked={currentUpdate.isLatestUpdate}
                onCheckedChange={(checked) => handleSwitchChange('isLatestUpdate', checked)}
              />
              <Label htmlFor="edit-is-latest-update">Mark as Latest Update</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => handleSaveUpdate(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUpdates;
