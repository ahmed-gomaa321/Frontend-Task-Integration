"use client";

import { useState, useRef, useCallback } from "react";
import { ChevronDown, Upload, X, FileText, Phone, Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PhoneInput } from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useLanguages from "@/hooks/use-languages";
import useVoices from "@/hooks/use-voice";
import usePrompts from "@/hooks/use-prompts";
import useModels from "@/hooks/use-model";
import { UploadItem } from "@/lib/types/attachment";
import { useUploadAttachment } from "@/hooks/use-upload-attachment";
import { useUpsertAgent } from "@/hooks/use-upsert-agent";
import FieldError from "../field-error";

interface UploadedFile {
  name: string;
  size: number;
  file: File;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function CollapsibleSection({
  title,
  description,
  badge,
  defaultOpen = false,
  children,
}: {
  title: string;
  description: string;
  badge?: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer select-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <CardTitle className="text-base">{title}</CardTitle>
                  <CardDescription className="mt-1">
                    {description}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {badge !== undefined && badge > 0 && (
                  <Badge variant="destructive">{badge} required</Badge>
                )}
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Separator />
          <CardContent className="pt-6">{children}</CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

export interface AgentFormInitialData {
  agentName?: string;
  id?: string;
  description?: string;
  callType?: string;
  language?: string;
  voice?: string;
  prompt?: string;
  model?: string;
  latency?: number;
  speed?: number;
  callScript?: string;
  serviceDescription?: string;
}

interface AgentFormProps {
  mode: "create" | "edit";
  initialData?: AgentFormInitialData;
}

export function AgentForm({ mode, initialData }: AgentFormProps) {
  // Form state — initialized from initialData when provided
  const [agentName, setAgentName] = useState(initialData?.agentName ?? "");
  const [agentId, setAgentId] = useState<string | null>(
    mode === "edit" ? (initialData?.id ?? null) : null,
  );
  const [callType, setCallType] = useState(initialData?.callType ?? "");
  const [language, setLanguage] = useState(initialData?.language ?? "");
  const [voice, setVoice] = useState(initialData?.voice ?? "");
  const [prompt, setPrompt] = useState(initialData?.prompt ?? "");
  const [model, setModel] = useState(initialData?.model ?? "");
  const [latency, setLatency] = useState([initialData?.latency ?? 0.5]);
  const [speed, setSpeed] = useState([initialData?.speed ?? 110]);
  const [description, setDescription] = useState(
    initialData?.description ?? "",
  );

  // Call Script
  const [callScript, setCallScript] = useState(initialData?.callScript ?? "");

  // Service/Product Description
  const [serviceDescription, setServiceDescription] = useState(
    initialData?.serviceDescription ?? "",
  );

  // Reference Data
  const [uploadedFiles, setUploadedFiles] = useState<UploadItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // tools
  const [allowHangUp, setAllowHangUp] = useState(false);
  const [allowCallback, setAllowCallback] = useState(false);
  const [liveTransfer, setLiveTransfer] = useState(false);

  // Test Call
  const [testFirstName, setTestFirstName] = useState("");
  const [testLastName, setTestLastName] = useState("");
  const [testGender, setTestGender] = useState("");
  const [testPhone, setTestPhone] = useState("");

  // errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Badge counts for required fields
  const basicSettingsMissing = [
    agentName,
    callType,
    language,
    voice,
    prompt,
    model,
  ].filter((v) => !v).length;

  // File upload handlers
  const ACCEPTED_TYPES = [
    ".pdf",
    ".doc",
    ".docx",
    ".txt",
    ".csv",
    ".xlsx",
    ".xls",
  ];

  // upload attachment
  const uploadMutation = useUploadAttachment(setUploadedFiles);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const newFiles: UploadItem[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = "." + file.name.split(".").pop()?.toLowerCase();
        if (!ACCEPTED_TYPES.includes(ext)) continue;

        const alreadyAdded = uploadedFiles.some(
          (f) => f.file.name === file.name && f.file.size === file.size,
        );
        if (alreadyAdded) continue;

        const item: UploadItem = { file, progress: 0, status: "idle" };
        newFiles.push(item);
        uploadMutation.mutate(item);
      }

      setUploadedFiles((prev) => [...prev, ...newFiles]);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [uploadMutation, uploadedFiles],
  );

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  // Fetch languages
  const {
    data: languages,
    isLoading: languagesLoading,
    error: languagesError,
  } = useLanguages();

  // Fetch voices
  const {
    data: voices,
    isLoading: voicesLoading,
    error: voicesError,
  } = useVoices();

  // Fetch prompts
  const {
    data: prompts,
    isLoading: promptsLoading,
    error: promptsError,
  } = usePrompts();

  // Fetch models
  const {
    data: models,
    isLoading: modelsLoading,
    error: modelsError,
  } = useModels();

  const heading = mode === "create" ? "Create Agent" : "Edit Agent";
  const saveLabel = mode === "create" ? "Save Agent" : "Save Changes";

  // save agent
  const { mutate: saveAgent, isPending: isSaving } = useUpsertAgent(
    agentId,
    setAgentId,
  );

  // validation form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // basic settings
    if (!agentName.trim()) newErrors.agentName = "Agent name is required";
    if (!callType) newErrors.callType = "Call type is required";
    if (!language) newErrors.language = "Language is required";
    if (!voice) newErrors.voice = "Voice is required";
    if (!prompt) newErrors.prompt = "Prompt is required";
    if (!model) newErrors.model = "Model is required";
    // test call
    if (!testFirstName.trim())
      newErrors.testFirstName = "First name is required";
    if (!testLastName.trim()) newErrors.testLastName = "Last name is required";
    if (!testGender) newErrors.testGender = "Gender is required";
    if (!testPhone.trim()) {
      newErrors.testPhone = "Phone number is required";
    } else if (!/^\+?\d{10,15}$/.test(testPhone)) {
      newErrors.testPhone = "Enter a valid phone number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // handle save agent
  const handleSaveAgent = () => {
    if (!validateForm()) return;

    const payload = {
      name: agentName,
      description,
      callType,
      language,
      voice,
      prompt,
      model,
      latency: latency[0],
      speed: speed[0],
      callScript,
      serviceDescription,
      attachments: uploadedFiles
        .filter(
          (f): f is UploadItem & { attachmentId: string } =>
            f.status === "success" && !!f.attachmentId,
        )
        .map((f) => f.attachmentId),
      tools: {
        allowHangUp,
        allowCallback,
        liveTransfer,
      },
    };

    saveAgent(payload);
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{heading}</h1>
        <Button onClick={handleSaveAgent} disabled={isSaving}>
          {isSaving ? (
            <span className="flex items-center gap-1">
              Saving <Loader size={20} className="animate-spin" />
            </span>
          ) : (
            saveLabel
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column — Collapsible Sections */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Section 1: Basic Settings */}
          <CollapsibleSection
            title="Basic Settings"
            description="Add some information about your agent to get started."
            badge={basicSettingsMissing}
            defaultOpen
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="agent-name">
                  Agent Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="agent-name"
                  placeholder="e.g. Sales Assistant"
                  value={agentName ?? ""}
                  onChange={(e) => setAgentName(e.target.value)}
                />
                <FieldError message={errors.agentName} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Describe what this agent does..."
                  value={description ?? ""}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Call Type <span className="text-destructive">*</span>
                </Label>
                <Select value={callType ?? ""} onValueChange={setCallType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select call type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inbound">
                      Inbound (Receive Calls)
                    </SelectItem>
                    <SelectItem value="outbound">
                      Outbound (Make Calls)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FieldError message={errors.callType} />
              </div>

              <div className="space-y-2">
                <Label>
                  Language <span className="text-destructive">*</span>
                </Label>
                <Select value={language ?? ""} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languagesLoading && (
                      <span>
                        loading <Loader size={20} className="animate-spin" />
                      </span>
                    )}
                    {languagesError && <span>Error loading languages</span>}
                    {!languagesLoading &&
                      languages?.map((lang) => (
                        <SelectItem key={lang.id} value={lang.id}>
                          {lang?.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FieldError message={errors.language} />
              </div>

              <div className="space-y-2">
                <Label>
                  Voice <span className="text-destructive">*</span>
                </Label>
                <Select value={voice ?? ""} onValueChange={setVoice}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {voicesLoading && (
                      <span>
                        loading <Loader size={20} className="animate-spin" />
                      </span>
                    )}
                    {voicesError && <span>Error loading voices</span>}
                    {!voicesLoading &&
                      voices?.map((voice) => (
                        <SelectItem
                          key={voice.id}
                          value={voice.id}
                          className="flex justify-between items-center gap-2"
                        >
                          <span>{voice.name}</span>
                          {voice.tag && (
                            <Badge variant="secondary">{voice.tag}</Badge>
                          )}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FieldError message={errors.voice} />
              </div>

              <div className="space-y-2">
                <Label>
                  Prompt <span className="text-destructive">*</span>
                </Label>
                <Select value={prompt ?? ""} onValueChange={setPrompt}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select prompt" />
                  </SelectTrigger>
                  <SelectContent>
                    {promptsLoading && (
                      <span>
                        loading <Loader size={20} className="animate-spin" />
                      </span>
                    )}
                    {promptsError && <span>Error loading prompts</span>}
                    {!promptsLoading &&
                      prompts?.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FieldError message={errors.prompt} />
              </div>

              <div className="space-y-2">
                <Label>
                  Model <span className="text-destructive">*</span>
                </Label>
                <Select value={model ?? ""} onValueChange={setModel}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {modelsLoading && (
                      <span>
                        loading <Loader size={20} className="animate-spin" />
                      </span>
                    )}
                    {modelsError && <span>Error loading models</span>}
                    {!modelsLoading &&
                      models?.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FieldError message={errors.model} />
              </div>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Latency ({latency[0].toFixed(1)}s)</Label>
                  <Slider
                    value={latency}
                    onValueChange={setLatency}
                    min={0.3}
                    max={1}
                    step={0.1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0.3s</span>
                    <span>1.0s</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Speed ({speed[0]}%)</Label>
                  <Slider
                    value={speed}
                    onValueChange={setSpeed}
                    min={90}
                    max={130}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>90%</span>
                    <span>130%</span>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Section 2: Call Script */}
          <CollapsibleSection
            title="Call Script"
            description="What would you like the AI agent to say during the call?"
          >
            <div className="space-y-2">
              <Textarea
                placeholder="Write your call script here..."
                value={callScript ?? ""}
                onChange={(e) => setCallScript(e.target.value)}
                rows={6}
                maxLength={20000}
              />
              <p className="text-xs text-muted-foreground text-right">
                {callScript.length}/20000
              </p>
            </div>
          </CollapsibleSection>

          {/* Section 4: Service/Product Description */}
          <CollapsibleSection
            title="Service/Product Description"
            description="Add a knowledge base about your service or product."
          >
            <div className="space-y-2">
              <Textarea
                placeholder="Describe your service or product..."
                value={serviceDescription ?? ""}
                onChange={(e) => setServiceDescription(e.target.value)}
                rows={6}
                maxLength={20000}
              />
              <p className="text-xs text-muted-foreground text-right">
                {serviceDescription.length}/20000
              </p>
            </div>
          </CollapsibleSection>

          {/* Section 5: Reference Data */}
          <CollapsibleSection
            title="Reference Data"
            description="Enhance your agent's knowledge base with uploaded files."
          >
            <div className="space-y-4">
              {/* Drop zone */}
              <div
                className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  multiple
                  accept={ACCEPTED_TYPES.join(",")}
                  onChange={(e) => handleFiles(e.target.files)}
                />
                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">
                  Drag & drop files here, or
                  <button
                    type="button"
                    className="text-primary underline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    browse
                  </button>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Accepted: .pdf, .doc, .docx, .txt, .csv, .xlsx, .xls
                </p>
              </div>

              {/* File list */}
              {uploadedFiles.length > 0 ? (
                <div className="space-y-2">
                  {uploadedFiles.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-md border px-3 py-2"
                    >
                      <div className="flex flex-col w-full">
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                          <span className="text-sm truncate">
                            {f.file.name}
                          </span>
                          <span className="text-xs text-muted-foreground shrink-0">
                            {formatFileSize(f.file.size)}
                          </span>
                        </div>
                        {f.status === "uploading" && (
                          <div className="h-1 w-full bg-muted-foreground/20 rounded mt-1">
                            <div
                              className="h-1 rounded bg-primary transition-all"
                              style={{ width: `${f.progress}%` }}
                            />
                          </div>
                        )}
                        <span className="text-xs mt-1">
                          {f.status === "uploading" && "Uploading..."}
                          {f.status === "success" && "Uploaded"}
                          {f.status === "error" && "Error"}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 shrink-0"
                        onClick={() => removeFile(i)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-muted-foreground">
                  <FileText className="h-10 w-10 mb-2" />
                  <p className="text-sm">No Files Available</p>
                </div>
              )}
            </div>
          </CollapsibleSection>

          {/* Section 6: Tools */}
          <CollapsibleSection
            title="Tools"
            description="Tools that allow the AI agent to perform call-handling actions and manage session control."
          >
            <FieldGroup className="w-full">
              <FieldLabel htmlFor="switch-hangup">
                <Field orientation="horizontal" className="items-center">
                  <FieldContent>
                    <FieldTitle>Allow hang up</FieldTitle>
                    <FieldDescription>
                      Select if you would like to allow the agent to hang up the
                      call
                    </FieldDescription>
                  </FieldContent>
                  <Switch
                    id="switch-hangup"
                    checked={allowHangUp}
                    onCheckedChange={setAllowHangUp}
                  />
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="switch-callback">
                <Field orientation="horizontal" className="items-center">
                  <FieldContent>
                    <FieldTitle>Allow callback</FieldTitle>
                    <FieldDescription>
                      Select if you would like to allow the agent to make
                      callbacks
                    </FieldDescription>
                  </FieldContent>
                  <Switch
                    id="switch-callback"
                    checked={allowCallback}
                    onCheckedChange={setAllowCallback}
                  />
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="switch-transfer">
                <Field orientation="horizontal" className="items-center">
                  <FieldContent>
                    <FieldTitle>Live transfer</FieldTitle>
                    <FieldDescription>
                      Select if you want to transfer the call to a human agent
                    </FieldDescription>
                  </FieldContent>
                  <Switch
                    id="switch-transfer"
                    checked={liveTransfer}
                    onCheckedChange={setLiveTransfer}
                  />
                </Field>
              </FieldLabel>
            </FieldGroup>
          </CollapsibleSection>
        </div>

        {/* Right Column — Sticky Test Call Card */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Test Call
                </CardTitle>
                <CardDescription>
                  Make a test call to preview your agent. Each test call will
                  deduct credits from your account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="test-first-name">First Name</Label>
                      <Input
                        id="test-first-name"
                        placeholder="John"
                        value={testFirstName ?? ""}
                        onChange={(e) => setTestFirstName(e.target.value)}
                      />
                      <FieldError message={errors.testFirstName} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="test-last-name">Last Name</Label>
                      <Input
                        id="test-last-name"
                        placeholder="Doe"
                        value={testLastName ?? ""}
                        onChange={(e) => setTestLastName(e.target.value)}
                      />
                      <FieldError message={errors.testLastName} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select
                      value={testGender ?? ""}
                      onValueChange={setTestGender}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError message={errors.testGender} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="test-phone">
                      Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <PhoneInput
                      defaultCountry="EG"
                      value={testPhone ?? ""}
                      onChange={(value) => setTestPhone(value)}
                      placeholder="Enter phone number"
                    />
                    <FieldError message={errors.testPhone} />
                  </div>

                  <Button className="w-full">
                    <Phone className="mr-2 h-4 w-4" />
                    Start Test Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Sticky bottom save bar */}
      <div className="sticky bottom-0 -mx-6 -mb-6 border-t bg-background px-6 py-4">
        <div className="flex justify-end">
          <Button onClick={handleSaveAgent} disabled={isSaving}>
            {isSaving ? (
              <span className="flex items-center gap-1">
                Saving <Loader size={20} className="animate-spin" />
              </span>
            ) : (
              saveLabel
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
